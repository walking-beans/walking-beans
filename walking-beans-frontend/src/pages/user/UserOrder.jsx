import React, { useEffect, useState } from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserCart from "../user/UserCart";
import "../../css/Order.css";
import "../../css/Cart.css";
import "../../css/Owner.css";
import UserMenuOptionModal from "../user/UserMenuOptionModal";
import oneStar from "../../images/star/oneStar.svg";
import detailBtn from "../../images/user/detailbtn.svg";
import UserMainMenuForm from "./teacherJSX/UserMainMenuForm";
import UserMenuCategory from "./teacherJSX/UserMenuCategory";

const UserOrder = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.user_id : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            alert("로그인 후 주문 가능합니다.");
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 5000);
        }
    }, [userId, navigate]);

    const [carts, setCarts] = useState([]);
    const { orderId, cartId, storeId } = useParams();
    const [totalAmount, setTotalAmount] = useState(0);
    const [menu, setMenu] = useState([]);
    const [store, setStore] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [menus, setMenus] = useState([]);
    const [groupedMenus, setGroupedMenus] = useState({});
    const [mainMenu, setMainMenu] = useState(null);

    const handleMenuClick = (menu) => {
        if (!menu.menuId) {
            console.error("handleMenuClick 오류: menuId가 없습니다.");
            return;
        }
        setSelectedMenu(menu);
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    useEffect(() => {
        if (userId) {
            console.log("userId:", userId);
            apiUserOrderService.getUserCartByUserId(userId)
                .then((data) => {
                    if (Array.isArray(data) && data.length > 0) {
                        setCarts(data);
                        calculateTotalAmount(data);
                    } else {
                        setCarts([]);
                        setTotalAmount(0);
                    }
                })
                .catch((err) => {
                    console.error("장바구니 데이터를 가져오는 중 오류 발생:", err);
                    setCarts([]);
                    setTotalAmount(0);
                });
        } else {
            console.warn("userId가 없습니다.");
        }
    }, [userId]);

    const calculateTotalAmount = (cartItems) => {
        const total = cartItems.reduce((sum, cart) => {
            const validMenuPrice = cart.menuPrices ? Number(cart.menuPrices) : 0;
            const validOptionPrice = cart.optionPrices ? Number(cart.optionPrices) : 0;
            const validQuantity = cart.totalQuantities ? Number(cart.totalQuantities) : 1;
            return sum + (validMenuPrice + validOptionPrice) * validQuantity;
        }, 0);
        setTotalAmount(total);
    };

    useEffect(() => {
        if (orderId) {
            apiUserOrderService.getUserOrderByOrderId(orderId)
                .then((data) => {
                    if (Array.isArray(data)) {
                        setCarts(data);
                    }
                })
                .catch((err) => console.error("주문 데이터 오류:", err));
        }
    }, [orderId]);

    const handleDelete = (deleteCartId) => {
        if (!deleteCartId) return;
        apiUserOrderService.deleteUserOrderCart(deleteCartId)
            .then(() => apiUserOrderService.getUserCartByUserId(userId))
            .then((updatedCart) => {
                setCarts(updatedCart);
            })
            .catch(err => console.error("장바구니 삭제 오류:", err));
    };
    useEffect(() => {
        if (carts.length > 0) {
            const total = carts.reduce((sum, cart) => {
                const validMenuPrice = cart.menuPrices ? Number(cart.menuPrices) || 0 : 0;
                const validOptionPrice = cart.optionPrices ? Number(cart.optionPrices) || 0 : 0;
                const validQuantity = cart.totalQuantities ? Number(cart.totalQuantities) || 1 : 1;
                return sum + (validMenuPrice + validOptionPrice) * validQuantity;
            }, 0);
            console.log("총 결제 금액 계산:", total);
            setTotalAmount(total);
        } else {
            setTotalAmount(0);
        }
    }, [carts]);

    useEffect(() => {
        if (storeId) {
            apiUserOrderService.getStoreByOrderId(storeId)
                .then((data) => {
                    if (data) {
                        setStore(data);
                    }
                })
                .catch((err) => console.error("가게 정보 오류:", err));
        }
    }, [storeId]);

    useEffect(() => {
        if (storeId) {
            apiUserOrderService.getMenuByStoreId(storeId)
                .then((data) => {
                    setMenus(data);
                    setGroupedMenus(groupMenusByCategory(data));
                    if (store?.storeMainMenu) {
                        const mainMenuItem = data.find(menu => menu.menuId === store.storeMainMenu);
                        setMainMenu(mainMenuItem || null);
                    }
                })
                .catch(err => console.error("메뉴 데이터 오류:", err));
        }
    }, [storeId, store]);

    const groupMenusByCategory = (menus) => {
        return menus.reduce((acc, menu) => {
            const category = menu.menuCategory || "기타";
            if (!acc[category]) acc[category] = [];
            acc[category].push(menu);
            return acc;
        }, {});
    };

    const openModal = (menu) => {
        setSelectedMenu(menu);
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "auto";
    };

    return (
        <div className="user-order-container">
            <div className="user-order-background">
                <div className="user-order-menu-container">
                    <div className="user-title">{store?.storeName}</div>
                    <div>
                        <img src={oneStar} alt="별점 아이콘" />
                        <span className="store-menu-title">
                            {store?.storeRating}({store?.storeReviewCount})
                        </span>
                        <Link to={`/user/order/${storeId}`}>
                            <img src={detailBtn} alt="가게 평점 자세히보기" />
                        </Link>
                    </div>

                    <div className="user-order-hr"></div>
                    <div className="user-cart-bordtext">대표메뉴</div>
                    <div className="user-order-mainmenu-grid">
                        {menus.map((menu, index) => (
                            <UserMainMenuForm
                                key={`${menu.menuId}-${index}`}
                                menuName={menu.menuName}
                                menuPrice={menu.menuPrice}
                                menuPictureUrl={menu.menuPictureUrl}
                                onClick={() => handleMenuClick(menu)}
                            />
                        ))}
                    </div>

                    <div className="user-order-menu">
                        {Object.entries(groupedMenus).map(([categoryName, menus]) => (
                            <UserMenuCategory
                                key={categoryName}
                                categoryName={categoryName}
                                menus={menus}
                                onMenuClick={handleMenuClick}
                            />
                        ))}
                    </div>
                </div>

                {modalOpen && selectedMenu && (
                    <div className="modal-backdrop" onClick={closeModal}>
                        <div className="user-menu-option-modal-container" onClick={(e) => e.stopPropagation()}>
                            <UserMenuOptionModal
                                userId={userId}
                                menu={selectedMenu}
                                onClose={closeModal}
                                updateCart={setCarts}
                            />
                        </div>
                    </div>
                )}

                <div className="user-cart-background">
                    <div className="user-title">장바구니</div>
                    <div className="user-cart-menuinfo">
                        {carts.length > 0 ? (
                            carts.map(cart => (
                                <UserCart
                                    key={cart.cartId}
                                    {...cart}
                                    handleDelete={() => handleDelete(cart.cartId)}
                                    updateCart={setCarts}
                                />
                            ))
                        ) : (
                            <div>장바구니가 비어 있습니다.</div>
                        )}

                        <div className="cart-fixed">
                            <button
                                className="user-order-btn"
                                onClick={() => navigate(`/checkout?totalAmount=${totalAmount}&storeId=${storeId}&addressId=${user.addressId}`)}

                            >
                                주문하기
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrder;