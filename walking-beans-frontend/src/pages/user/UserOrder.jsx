import React, {use, useEffect, useRef, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import {Link, useNavigate, useParams} from "react-router-dom";
import UserCart from "../user/UserCart";
import "../../css/Order.css"
import "../../css/Cart.css"
import "../../css/Owner.css"
import oneStar from "../../images/star/oneStar.svg"
import detailBtn from "../../images/user/detailbtn.svg"
import UserMenuOptionModal from "./UserMenuOptionModal";
import UserMenuCategory from "./UserMenuCategory";
import UserMainMenuForm from "./UserMainMenuForm";
import axios from "axios";

const UserOrder = () => {
    const [carts, setCarts] = useState([]);
    const {orderId, cartId, storeId, menuId} = useParams();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [menu, setMenu] = useState([]);
    const [store, setStore] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [options, setOptions] = useState([]);
    const [menus, setMenus] = useState([]);
    const [groupedMenus, setGroupedMenus] = useState({});
    const [categoryName, setCategoryName] = useState([]);
    const [mainMenu, setMainMenu] = useState([]);
    const [orderStatus, setOrderStatus] = useState(0);
    const [orderRequests, setOrderRequests] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("meetPayment");

    // orderId, cartId 서버에 저장
    const createOrder = async (orderData) => {
        try {
            const response = await axios.post("http://localhost:7070/api/orders/create", orderData);

            if (response.data.orderId) {
                localStorage.setItem("orderId", response.data.orderId);
                localStorage.setItem("storeId", response.data.storeId);
                localStorage.setItem("cartIdList", JSON.stringify(response.data.cartIdList)); // 배열 저장

                console.log("생성된 주문 ID:", response.data.orderId);
                console.log("가게 ID:", response.data.storeId);
                console.log("장바구니 ID 리스트:", response.data.cartIdList);
            }
        } catch (err) {
            console.error("주문 생성 중 오류 발생:", err);
        }
    };

    // 주문 생성(데이터 저장)
    const handleOrder = () => {
        const storedUser = localStorage.getItem('user'); // 로컬 스토리지에서 사용자 정보 가져오기
        const userAddress = localStorage.getItem('addressUpdated'); // 로컬 스토리지에서 사용자 정보 가져오기

        // 사용자가 로그인되어 있는지 확인
        if (!storedUser) {
            // 로그인되지 않았다면 로그인 페이지로 리디렉션
            alert("로그인 후 주문이 가능합니다.");
            navigate('/login'); // 로그인 페이지로 이동
            return; // 로그인 유도 후 더 이상 주문 처리하지 않음
        }

        const parsedUser = JSON.parse(storedUser); // 사용자 정보 파싱
        const parsedUserAddress = JSON.parse(userAddress); // 사용자 정보 파싱
        const userId = parsedUser.user_id; // 사용자 ID 설정
        const addressId = parsedUserAddress.address_id;

        // 주문 데이터 생성
        const orderData = {
            orders: {
                userId: userId,
                storeId: storeId,
                addressId: addressId,
                orderStatus: orderStatus,
                orderRequests: orderRequests,
                orderTotalPrice: totalAmount,
            },
            cartList: carts,  // 장바구니 데이터
            payments: {
                paymentMethod: paymentMethod,
                totalAmount: totalAmount,
            },
        };

        // 주문 생성 함수 호출
        createOrder(orderData);
    };

    // 메뉴 선택 시 endpoint 변경
    const handleMenuClick = (menu) => {
        // menuId가 없으면 오류 처리
        if (!menu.menuId) {
            console.error("menuId 없음 : ", menuId);
            return;
        }
        navigate(`/user/order/${storeId}/${menu.menuId}`);
        openModal(menu);
    };

    // carts 데이터 가져오기
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

    // option 데이터 가져오기
    useEffect(() => {
        if (orderId) {
            apiUserOrderService.getUserOrderByOrderId(orderId, setCarts)
                .then(() => {
                    console.log("주문에 해당하는 장바구니 데이터 업데이트 완료");
                })
                .catch((err) => {
                    console.error("getUserOrderByOrderId 에러 발생", err);
                });
        }
    }, [orderId]);

    // 장바구니 메뉴 삭제하기
    const handleDelete = (deleteCartId) => {
        console.log("삭제 요청된 cartId:", deleteCartId);

        if (!deleteCartId) {
            console.error("삭제할 cartId가 없습니다!");
            return;
        }

        apiUserOrderService.deleteUserOrderCart(deleteCartId, setCarts)
            .then(() => {
                setCarts(prevCarts => prevCarts.filter(cart => cart.cartId !== deleteCartId));
                console.log(`cartId ${deleteCartId} 삭제 완료`);
            })
            .catch(err => console.error("장바구니 삭제 중 오류 발생:", err));
    };

    // 총 금액 계산하기
    useEffect(() => {
        if (Array.isArray(carts)) {
            const total = carts.reduce((sum, cart) => sum + Number(cart.menuPrice) + Number(cart.optionPrice), 0);
            setTotalAmount(total);
        } else {
            console.warn("carts 데이터가 배열이 아닙니다.");
        }
    }, [carts]);

    // 가게 데이터 가져오기
    useEffect(() => {
        apiUserOrderService.getStoreByOrderId(storeId, setStore);
    }, [storeId]);

    // 메뉴 데이터 가져오기
    useEffect(() => {
        apiUserOrderService.getMenuByStoreId(storeId, setMenu)
            .then((data) => {
                setMenus(data);
                const grouped = groupMenusByCategory(data);
                setGroupedMenus(grouped);
            })
            .catch((err) => console.error("메뉴 데이터를 가져오는 중 오류 발생:", err));
    }, [storeId]);

    // 모달 열기
    const openModal = (menu) => {
        setSelectedMenu(menu);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    // 배경 클릭 시 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = 'auto';
        navigate(`/user/order/${storeId}`);
    };

    // 메뉴 id로 옵션 가져오기
    useEffect(() => {
            apiUserOrderService.getOptionsByMenuId(menuId, setOptions)
        }, [menuId]
    );

    // 카테고리 가져오기
    const groupMenusByCategory = (menus) => {
        return menus.reduce((acc, menu) => {
            const category = menu.menuCategory

            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(menu);
            return acc;
        }, {});
    };

    // 대표메뉴 정보 가져오기
    useEffect(() => {
        if (!storeId) return; // storeId가 없으면 실행하지 않음

        apiUserOrderService.getMenusByStoreId(storeId)
            .then((data) => {
                setMenu(data);

                // 대표 메뉴 찾기
                if (store?.storeMainMenu) {
                    const mainMenuItem = data.find(menuItem => menuItem.menuId === store.storeMainMenu);
                    setMainMenu(mainMenuItem || null); // 대표 메뉴가 없으면 null로 설정
                }
            })
            .catch(err => console.error("대표메뉴 데이터 가져오는 중 오류 발생:", err));

    }, [storeId, store]);

    return (
        <div className="user-order-container">
            <div className="user-order-background">
                <div className="user-order-menu-container">

                    {/* menu */}
                    <div className="user-title">{store?.storeName}</div>
                    <div><img src={oneStar} alt="별점 아이콘"/>
                        <sapn className="store-menu-title">{store?.storeRating}({store?.storeReviewCount})</sapn>

                        <Link to={`/user/order/${storeId}`}><img src={detailBtn}
                                                                 alt="가게 평점 자세히보기 - 페이지 만들면 다시 설정하기"/></Link>
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>
                    <div className="user-cart-bordtext">대표메뉴</div>
                    <div className="user-order-mainmenu-grid">
                        {menu.map((menu, index) => (
                            <UserMainMenuForm
                                key={`${menu.menuId}-${index}`}
                                menuName={menu.menuName}
                                menuPrice={menu.menuPrice}
                                onClick={() => handleMenuClick(menu)}
                            />
                        ))
                        }
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

                {/* menuOption modal*/}
                {modalOpen && (
                    <div className="modal-backdrop" onClick={closeModal}>
                        <div className="user-order-modal-container" onClick={(e) => e.stopPropagation()}>
                            <UserMenuOptionModal
                                menuPrice={selectedMenu?.menuPrice}
                                menuId={selectedMenu?.menuId}
                                menuDescription={selectedMenu?.menuDescription}
                                onClose={closeModal}
                            />
                        </div>
                    </div>
                )}


                {/* cart */}
                <div className="user-cart-background">
                    <div className="user-title">장바구니</div>
                    <div className="user-cart-menuinfo">
                        {carts && carts.length > 0 ? (
                            carts.map((cart) => (
                                <UserCart key={cart.cartId}
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
                        <button className="user-order-btn" onClick={handleOrder}>주문하기</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default UserOrder;