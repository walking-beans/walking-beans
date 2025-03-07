import React, {use, useEffect, useRef, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import {Link, useNavigate, useParams} from "react-router-dom";
import UserCart from "../user/UserCart";
import StoreMenuForm from "../owner/StoreMenuForm";
import "../../css/Order.css"
import "../../css/Cart.css"
import "../../css/Owner.css"
import oneStar from "../../images/star/oneStar.svg"
import detailBtn from "../../images/user/detailbtn.svg"
import UserMenuOptionModal from "./UserMenuOptionModal";

const UserOrder = () => {
    const [carts, setCarts] = useState([]);
    const {orderId, cartId, storeId} = useParams();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [menu, setMenu] = useState([]);
    const [store, setStore] = useState([]);
    const modalBackground = useRef(null); //배경 눌렀을 때 돌아가기
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [options, setOptions] = useState([]);
    const [optionContent, setOptionContent] = useState([]);

    // carts 데이터 가져오기 (장바구니로 메뉴를 담았을 때 실행 필요)
    useEffect(() => {
        if (cartId) {
            apiUserOrderService.getUserOrderByCartId(cartId)
                .then((data) => {
                    console.log("cart에서 받아온 데이터", data);
                    setCarts(data); // carts 업데이트
                })
                .catch((err) => {
                    console.error("주문 데이터를 가져오는 중 오류 발생:", err);
                });
        }
    }, [cartId]);

    // 장바구니 메뉴 삭제하기
    const handleDelete = (deleteCartId) => {
        apiUserOrderService.deleteUserOrderCart(deleteCartId)
            .then(() => {
                setCarts((prevCarts) => prevCarts.filter(cart => cart.cartId !== deleteCartId));
            })
            .catch(err => console.error("장바구니 삭제 중 오류 발생:", err));
    };

    // option 데이터 가져오기 (장바구니로 메뉴를 담았을 때 실행 필요)
    useEffect(() => {
        if (orderId) {
            apiUserOrderService.getUserOrderByOrderId(orderId);
        }
    }, [orderId]);

    // 총 금액 계산하기
    useEffect(() => {
        if (Array.isArray(carts) && carts.length > 0) {
            const total = carts.reduce((sum, cart) => {
                const menuPrice = Number(cart.menuPrice) || 0;
                const optionPrice = Number(cart.optionPrice) || 0;
                return sum + menuPrice + optionPrice;
            }, 0);
            setTotalAmount(total);
        } else {
            setTotalAmount(0);
        }
    }, [carts]);

    // 가게 데이터 가져오기
    useEffect(() => {
        apiUserOrderService.getStoreByOrderId(storeId, setStore);
    }, [storeId]);

    // 메뉴 데이터 가져오기
    useEffect(() => {
        apiUserOrderService.getMenuByStoreId(storeId, setMenu);
    }, [storeId]);

    // 메뉴 id로 옵션 가져오기
    useEffect(() => {
        if (selectedMenu?.menuId) {
            apiUserOrderService.getOptionsByMenuId(selectedMenu.menuId, setOptions)
                .then(data => {
                    console.log("가져온 옵션 데이터:", data);
                    setOptions(data);
                })
                .catch(error => console.error("옵션 가져오기 오류:", error));
        }
    }, [selectedMenu]);

    // 모달 열기
    const openModal = (menu) => {
        setSelectedMenu(menu);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    // 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = 'auto';
    };


    // 배경 클릭 시 모달을 닫는 함수
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    // 메뉴 Id로 옵션 가져오기
    useEffect(() => {
        if (selectedMenu?.menuId) {
            apiUserOrderService.getOptionsByMenuId(selectedMenu.menuId, setOptions);

        }
    }, [selectedMenu]);

    return (
        <div className="userorder-container">
            <div className="user-order-background">
                <div className="user-order-menu-container">

                    {/* menu */}
                    <div className="user-cart-title">{store?.storeName}</div>
                    <div><img src={oneStar} alt="별점 아이콘"/>
                        <sapn className="store-menu-title">{store?.storeRating}({store?.storeReviewCount})</sapn>

                        <Link to={`/user/order/${storeId}`}><img src={detailBtn}
                                                                 alt="가게 평점 자세히보기 - 페이지 만들면 다시 설정하기"/></Link>
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>
                    <div className="user-cart-bordtext">대표메뉴</div>

                    {/* 카테고리별로 만들기 */}
                    <div className="user-order-menuinfo">
                        {menu.map((menu) => (
                            <StoreMenuForm
                                key={menu.menuId}
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

            {/*수정한 코드*/}
            {modalOpen && (
                <div className="modal-backdrop" onClick={handleBackgroundClick}>
                    <div className="user-order-modal-container" onClick={(e) => e.stopPropagation()}>
                        <UserMenuOptionModal
                            menuPrice={selectedMenu?.menuPrice}
                            optionContent={selectedMenu.optionContent}
                            onClose={closeModal}
                        />
                    </div>
                </div>
            )}


            {/* cart */}
            <div className="user-cart-background">
                <div className="user-cart-title">장바구니</div>
                <div className="user-cart-menuinfo">
                    {carts && carts.length > 0 ? (
                        carts.map((cart) => (
                            <UserCart key={cart.cartId}
                                      menuName={cart.menuName}
                                      menuPrice={cart.menuPrice}
                                      optionName={cart.optionName}
                                      optionPrice={cart.optionPrice}
                                      onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="user-order-emptybtn">메뉴를 선택해 주세요</div>
                    )}
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