import "../../css/Order.css";
import "../../css/Cart.css";
import UserMenuOption from "./UserMenuOption";
import UserMenuOptionGroup from "./UserMenuOptionGroup"
import defaultDetailImage from "../../images/user/defaultDetailImage.svg";
import React, {useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import {useNavigate, useParams} from "react-router-dom";

const UserMenuOptionModal = ({menuPrice}) => {
        const [selectedOption, setSelectedOption] = useState([]);
        const {orderId, cartId, storeId, menuId, userId} = useParams();
        const navigate = useNavigate();
        const [options, setOptions] = useState([]);
        const [grouped, setGrouped] = useState([]);
        const [menuName, setMenuName] = useState([]);
        const [address, setAddress] = useState([]);

    const [selectedUserId, setSelectedUserId] = useState(null);
        const [selectedStoreId, setSelectedStoreId] = useState(null);

        const [selectedOrderRequests, setSelectedOrderRequests] = useState([]);

        const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

        // 카테고리 가져오기
        const groupOptionsByName = (options) => {
            console.log("그룹화 전 옵션 데이터:", options);
            if (!Array.isArray(options) || options.length === 0) {
                return {};
            }
            return options.reduce((acc, option) => {
                if (!acc[option.optionName]) {
                    acc[option.optionName] = [];
                }
                acc[option.optionName].push(option);
                return acc;
            }, {});
        };

        // 메뉴 id로 옵션 가져오기
        useEffect(() => {
                apiUserOrderService.getOptionsByMenuId(menuId, setOptions)
            }, [menuId]
        );

        // 계산된 금액
        const calculateTotalPrice = (cartData) => {
            return cartData.reduce((total, item) => {
                return total + (item.optionPrice * item.cartQuantity); // 가격 * 수량 합산
            }, 0);
        };

        //추가한 코드
        useEffect(() => {
            console.log("옵션 데이터:", options);
            if (options.length > 0) {
                const grouped = groupOptionsByName(options);
                console.log("그룹화된 옵션 데이터:", grouped);
                setGrouped(grouped);
            }
        }, [options]);

        useEffect(() => {
            console.log("옵션 데이터 : ", options);
            console.log("그룹옵션 데이터 : ", grouped);
        }, [grouped, options])

        // 장바구니에 추가 선택 시 장바구니에 넣기
    const handleAddToCart = async () => {
        const cartItems = Object.keys(selectedOption).map(optionName => {
            const option = selectedOption[optionName];
            return {
                cartId: cartId,
                optionId: option.optionId,
                menuId: menuId,
                optionName: option.optionName,
                optionContent: option.optionContent,
                optionPrice: option.optionPrice,
                menuName: menuName,
                menuPrice: menuPrice,
                userId: userId,
                address: address,
            };
        });

        const requestData = {
            cartItems: cartItems,
            storeId: selectedStoreId,
            totalPrice: calculateTotalPrice(cartItems),
            paymentMethod: selectedPaymentMethod,
            orderRequest: selectedOrderRequests || '',
        };

        try {
            await apiUserOrderService.addToCart(requestData);
            alert("장바구니에 추가되었습니다!");
            navigate(`/user/order/${storeId}/${menuId}/${orderId}/${cartId}`);
        } catch (error) {
            console.error("장바구니 추가 중 오류 발생:", error);
            alert("장바구니 추가에 실패했습니다.");
        }
    };
        const handleOptionChange = (optionName, option) => {
            setSelectedOption(prevSelectedOptions => ({
                ...prevSelectedOptions,
                [optionName]: option,
            }));
        };

        /*
        if (!selectedOption) {
            alert("옵션을 선택해주세요.");
            return;
        }

        if (!menuId || !storeId) {
            console.error("⛔ menuId 또는 storeId가 없음:", { menuId, storeId });
            alert("메뉴 정보를 가져올 수 없습니다.");
            return;
        }

        const cartData = {
            menuId: selectedOption.menuId,
            optionId: selectedOption.optionId,
            menuPrice: menuPrice,
            optionContent: selectedOption.optionContent,
            optionPrice: selectedOption.optionPrice,
        };

        try {
            const response = await apiUserOrderService.addToCart(cartData);
            console.log("장바구니 추가 성공:", response.data);

            // 응답에서 orderId와 cartId를 제대로 받아왔는지 확인
            if (!response.data || !response.data.orderId || !response.data.cartId) {
                throw new Error("⛔ orderId 또는 cartId가 응답에 없음");
            }

            const { orderId, cartId } = response.data;

            alert("장바구니에 추가되었습니다!");
            navigate(`/user/order/${storeId}/${menuId}/${orderId}/${cartId}`);
        } catch (error) {
            console.error("장바구니 추가 중 오류 발생:", error);
            alert("장바구니 추가에 실패했습니다.");
        }
    };
     */


        return (
            <div className="user-menu-option-modal-container">
                <div className="user-cart-title">메뉴 상세</div>
                <img src={defaultDetailImage} alt="메뉴 사진"/>
                <div className="user-cart-grid">
                    <div className="user-cart-bordtext">가격</div>
                    <div className="user-cart-bordtext">{menuPrice}원</div>
                </div>
                <hr className="user-order-hr"/>

                <form className="user-order-option-modal">
                    {Object.keys(grouped).length > 0 ? (
                        Object.entries(grouped).map(([optionName, options]) => (
                            <UserMenuOptionGroup
                                key={optionName}
                                optionName={optionName}
                                options={options}
                                selectedOption={selectedOption[optionName]}  // 선택된 옵션 전달
                                onOptionChange={handleOptionChange}  // 변경 시 상태 업데이트
                            />
                        ))
                    ) : (
                        <div>옵션이 없습니다.</div>
                    )}
                </form>
                <div className="user-order-click-btn">
                    <button type="submit" className="user-order-mini-btn" onClick={handleAddToCart}>장바구니추가</button>
                    <button type="submit" className="user-order-mini-btn">주문하기</button>
                </div>
            </div>
        )
    }
;

export default UserMenuOptionModal;