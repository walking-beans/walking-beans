import React, {use, useEffect, useRef, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import {Link, useNavigate, useParams} from "react-router-dom";
import UserCart from "../user/UserCart";
import StoreMenuForm from "../owner/StoreMenuForm";
import "../../css/Order.css"
import "../../css/Cart.css"
import oneStar from "../../images/star/oneStar.svg"
import detailBtn from "../../images/user/detailbtn.svg"
import UserMenuOptionModal from "./UserMenuOptionModal";
import {options} from "axios";

const UserOrder = () => {
    const [carts, setCarts] = useState([]);
    const {orderId, cartId, storeId, optionId} = useParams();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [menu, setMenu] = useState([]);
    const [store, setStore] = useState([]);
    const modalBackground = useRef(); //배경 눌렀을 때 돌아가기
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);


    // carts 데이터 가져오기 (장바구니로 메뉴를 담았을 때 실행 필요)
    useEffect(() => {
        apiUserOrderService.getUserOrderByCartId(cartId);
    }, [cartId]);

    // 장바구니 메뉴 삭제하기
    const handleDelete = () => {
        apiUserOrderService.deleteUserOrderCart(cartId, setCarts)
        window.location.reload(); // 새로고침
    };

    // option 데이터 가져오기 (장바구니로 메뉴를 담았을 때 실행 필요)
    useEffect(() => {
        if (orderId) {
            apiUserOrderService.getUserOrderByOrderId(orderId)
                .then((data) => {
                    console.log("cart에서 받아온 데이터", data);
                    setCarts(data);
                })
                .catch((err) => {
                    console.error("주문 데이터를 가져오는 중 오류 발생:", err);
                });
        }
    }, [orderId]);

    // 총 금액 계산하기
    useEffect(() => {
        const total = carts.reduce((sum, cart) => {
            const menuPrice = Number(cart.menuPrice) || 0;
            const optionPrice = Number(cart.optionPrice) || 0;
            return sum + menuPrice + optionPrice;
        }, 0);
        setTotalAmount(total);
    }, [carts]);

    // 가게 데이터 가져오기
    useEffect(() => {
        apiUserOrderService.getStoreByOrderId(storeId, setStore);
    }, []);

    // 메뉴 데이터 가져오기
    useEffect(() => {
        apiUserOrderService.getMenuByStoreId(storeId, setMenu);
    }, []);

    // 메뉴 선택 시 모달 열기
    const openModal = (menu) => {
        setSelectedMenu(menu);
    };

    useEffect(() => {
        if (selectedMenu?.menuId) {
            apiUserOrderService.getOptionsByMenuId(selectedMenu.menuId, setOptions);
        }
    }, [selectedMenu]);

    // 모달 닫기 (배경 클릭 시)
    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <div className="userorder-container">
            <div className="user-order-background">
                <div className="user-order-menu-container">

                    {/* menu */}
                    <div className="user-cart-title">{store?.storeName}</div>
                    <div><img src={oneStar} alt="별점 아이콘"/>
                        별점 평균(평점 개수)
                        <Link to={`/user/order/${storeId}`}><img src={detailBtn}
                                                                 alt="가게 평점 자세히보기 - 페이지 만들면 다시 설정하기"/></Link>
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>
                    <div className="user-cart-bordtext">대표메뉴</div>

                    {/* 카테고리별로 만들기 */}
                    <div className="user-order-menuinfo">
                        {menu.map((menu) => (
                            <StoreMenuForm
                                key={menu.storeId}
                                menuName={menu.menuName}
                                menuPrice={menu.menuPrice}
                                onClick={() => openModal(menu)}
                            />
                        ))
                        }
                    </div>
                    <div className="user-order-hr" alt="구분선"></div>
                    <div className="user-cart-bordtext">{store?.menuCategory}</div>

                </div>
            </div>

            {/* menuOption modal */}
            <div className="user-order-modal-container">
                {options.length > 0 ? (

                    options.map((option) => (
                        <UserMenuOptionModal key={optionId}
                                             optionName={option.optionName}
                                             optionContent={option.optionContent}
                                             optionPrice={option.optionPrice}
                        />

                    ))
                ) : (
                    <p>옵션이 없습니다.</p>
                )}
            </div>


            {/* cart */}
            <div className="user-cart-background">
                <div className="user-cart-title">장바구니</div>
                <div className="user-cart-menuinfo">

                    {
                        carts.map((cart) => (
                            <UserCart key={cart.cartId}
                                      menuName={cart.menuName}
                                      menuPrice={cart.menuPrice}
                                      optionName={cart.optionName}
                                      optionPrice={cart.optionPrice}

                                      onDelete={handleDelete}
                            />
                        ))
                    }
                </div>

                <div className="user-order-hr"></div>
                <div className="user-cart-grid">
                    <div className="user-cart-bordtext">
                        최종 결제 금액
                    </div>
                    <div className="user-cart-title">{totalAmount.toLocaleString()}원</div>
                </div>
                <button className="user-order-btn">주문하기</button>
            </div>

        </div>
    )
}
export default UserOrder;