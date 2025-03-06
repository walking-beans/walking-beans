import React, {useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import {Link, useNavigate, useParams} from "react-router-dom";
import UserCart from "../user/UserCart";
import StoreMenuForm from "../owner/StoreMenuForm";
import "../../css/Order.css"
import "../../css/Cart.css"
import oneStar from "../../images/star/oneStar.svg"
import detailBtn from "../../images/user/detailbtn.svg"


const UserOrder = () => {
    const [carts, setCarts] = useState([]);
    const {orderId, cartId, storeId} = useParams();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [menu, setMenu] = useState([]);
    const [store, setStore] = useState([]);

    // carts 데이터 가져오기
    useEffect(() => {
        const fetchCart = async () => {
            apiUserOrderService.getUserOrderByCartId(cartId);
        };

    }, [cartId]);

    // 메뉴 삭제하기
    const handleDelete = () => {
        apiUserOrderService.deleteUserOrderCart(cartId, setCarts)
        window.location.reload(); // 새로고침
    };

    // option 데이터 가져오기
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


    return (
        <div className="user-order-background">
        <div className="userorder-container">
            {/* menu */}
            <div className="user-cart-title">{store?.storeName}</div>
            <div><img src={oneStar} alt="별점 아이콘"/>
                별점 평균(평점 개수)
                <Link to={`/review/${storeId}`}><img src={detailBtn} alt="가게 평점 자세히보기"/></Link>
            </div>

            <div className="user-order-hr" alt="구분선"></div>
            <div className="user-cart-bordtext">대표메뉴</div>

            <div>
                <p>이미지</p>
                <div>
                    메뉴명
                    가격
                </div>
            </div>

            <div className="user-order-hr" alt="구분선"></div>
            <div className="user-cart-bordtext">{store?.menuCategory}</div>

            <div>
                <div className="user-order-menu">
                    <div className="user-order-menuinfo">
                        {
                            menu.map((menu) => (
                                <StoreMenuForm key={menu.storeId}
                                               menuName={menu.menuName}
                                               menuPrice={menu.menuPrice}

                                               onAddToCart={menu.onAddToCart}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

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
    );
};

export default UserOrder;