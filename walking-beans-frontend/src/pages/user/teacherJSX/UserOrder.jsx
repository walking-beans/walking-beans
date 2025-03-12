import React, {use, useEffect, useRef, useState} from "react";
import apiUserOrderService from "../../../service/apiUserOrderService";
import {Link, useNavigate, useParams} from "react-router-dom";
import UserCart from "../../user/UserCart";
import "../../../css/Order.css"
import "../../../css/Cart.css"
import "../../../css/Owner.css"
import oneStar from "../../../images/star/oneStar.svg"
import detailBtn from "../../../images/user/detailbtn.svg"
import UserMenuOptionModal from "./UserMenuOptionModal";
import UserMenuCategory from "./UserMenuCategory";
import UserMainMenuForm from "./UserMainMenuForm";

const UserOrder = () => {
    const [carts, setCarts] = useState([]);
    const { orderId, cartId, storeId, menuId } = useParams();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [menu, setMenu] = useState([]);
    const [store, setStore] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [menus, setMenus] = useState([]);
    const [groupedMenus, setGroupedMenus] = useState({});
    const [mainMenu, setMainMenu] = useState(null);

    // 메뉴 클릭 시 모달 열기 & URL 변경
    const handleMenuClick = (menu) => {
        if (!menu.menuId) {
            console.error("menuId 없음:", menu);
            return;
        }
        if (!orderId) {
            navigate(`/user/order/${storeId}/${menu.menuId}`);
        } else {
            navigate(`/user/order/${storeId}/${menu.menuId}/${orderId}/${cartId}`);
        }
        openModal(menu);
    };

    // 장바구니 데이터 가져오기
    useEffect(() => {
        if (cartId) {
            apiUserOrderService.getUserOrderByCartId(cartId)
                .then((data) => setCarts(data))
                .catch((err) => console.error("장바구니 데이터 오류:", err));
        }
    }, [cartId]);

    // 주문 데이터 가져오기
    useEffect(() => {
        if (orderId) {
            apiUserOrderService.getUserOrderByOrderId(orderId, setCarts)
                .catch((err) => console.error("주문 데이터 오류:", err));
        }
    }, [orderId]);

    // 장바구니 아이템 삭제
    const handleDelete = (deleteCartId) => {
        if (!deleteCartId) return;
        apiUserOrderService.deleteUserOrderCart(deleteCartId)
            .then(() => setCarts(prev => prev.filter(cart => cart.cartId !== deleteCartId)))
            .catch(err => console.error("장바구니 삭제 오류:", err));
    };

    // 총 금액 계산
    useEffect(() => {
        const total = carts.reduce((sum, cart) => sum + Number(cart.menuPrice) + Number(cart.optionPrice || 0), 0);
        setTotalAmount(total);
    }, [carts]);

    // 가게 정보 가져오기
    useEffect(() => {
        apiUserOrderService.getStoreByOrderId(storeId, setStore);
    }, [storeId]);

    // 메뉴 데이터 가져오기
    useEffect(() => {
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
    }, [storeId, store]);

    // 메뉴 그룹화 (카테고리별)
    const groupMenusByCategory = (menus) => {
        return menus.reduce((acc, menu) => {
            const category = menu.menuCategory || "기타";
            if (!acc[category]) acc[category] = [];
            acc[category].push(menu);
            return acc;
        }, {});
    };

    // 모달 열기
    const openModal = (menu) => {
        setSelectedMenu(menu);
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    // 모달 닫기
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
                        <span className="store-menu-title">{store?.storeRating} ({store?.storeReviewCount})</span>
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

                {/* 메뉴 상세 모달 */}
                {modalOpen && (
                    <div className="modal-backdrop" onClick={closeModal}>
                        <div className="user-order-modal-container" onClick={(e) => e.stopPropagation()}>
                            <UserMenuOptionModal
                                menuPictureUrl={selectedMenu?.menuPictureUrl}
                                menuName={selectedMenu?.menuName}
                                menuPrice={selectedMenu?.menuPrice}
                                menuDescription={selectedMenu?.menuDescription}
                                onClose={closeModal}
                            />
                        </div>
                    </div>
                )}

                {/* 장바구니 */}
                <div className="user-cart-background">
                    <div className="user-title">장바구니</div>
                    <div className="user-cart-menuinfo">
                        {carts.length > 0 ? (
                            carts.map((cart) => (
                                <UserCart
                                    key={cart.cartId}
                                    cartId={cart.cartId}
                                    menuName={cart.menuName}
                                    menuPrice={cart.menuPrice}
                                    optionName={cart.optionName}
                                    optionPrice={cart.optionPrice}
                                    handleDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <div className="user-order-emptybtn">메뉴를 선택해 주세요</div>
                        )}
                    </div>
                    <div className="cart-fixed">
                        <div className="user-order-hr"></div>
                        <div className="user-cart-grid">
                            <div className="user-cart-pricetext">최종 결제 금액</div>
                            <div className="user-title">{totalAmount.toLocaleString()}원</div>
                        </div>
                        <button className="user-order-btn">주문하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrder;