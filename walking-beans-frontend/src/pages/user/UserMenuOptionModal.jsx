import "../../css/Order.css";
import "../../css/Cart.css";
import UserMenuOption from "./UserMenuOption";
import UserMenuOptionGroup from "./UserMenuOptionGroup"
import defaultDetailImage from "../../images/user/defaultDetailImage.svg";
import React, {useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import {useNavigate, useParams} from "react-router-dom";

const UserMenuOptionModal = ({menuPrice, menuDescription, onClose}) => {
        const [selectedOption, setSelectedOption] = useState([]);
        const {cartId, storeId, menuId} = useParams();
        const navigate = useNavigate();
        const [options, setOptions] = useState([]);
        const [grouped, setGrouped] = useState([]);
        const [menuName, setMenuName] = useState("");
        const [addressId, setAddressId] = useState("");
        const [userId, setUserId] = useState(null);
        const [paymentMethod, setPaymentMethod] = useState("meetPayment");
        const [selectedOrderRequests, setSelectedOrderRequests] = useState("");

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
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("user:", user);

        if (!user || !user.user_id) {
            console.log("user 정보가 없거나 user_id가 없습니다.");
            return;
        }

        const userId = user.user_id;
        console.log("userId:", userId);

        const userAddress = localStorage.getItem('addressUpdated');
        console.log("userAddress:", userAddress);

        let addressId = null;
        if (userAddress) {
            const parsedUserAddress = JSON.parse(userAddress);
            addressId = parsedUserAddress.address_id;
        } else {
            console.log("주소 없이 장바구니 추가 완료");
            addressId = ''; // 주소가 없다면 기본값
        }

        // selectedOption이 비어 있지 않지만, 각 옵션이 선택되었는지 확인
        const hasSelectedOptions = Object.keys(selectedOption).some(optionName => selectedOption[optionName].optionId !== null);

        if (!hasSelectedOptions) {
            console.log("옵션 선택 안함");
            alert("옵션을 선택해주세요.");
            return; // 옵션이 선택되지 않았다면 장바구니에 추가하지 않음
        }

        // cartItems 생성
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
                address: addressId,
                storeId: storeId,
            };
        });

        const requestData = {
            cartItems: cartItems,
            totalPrice: calculateTotalPrice(cartItems) || 0,
            orderRequest: selectedOrderRequests || "",
            payments: { paymentMethod: paymentMethod },
        };

        console.log("requestData:", requestData);

        try {
            await apiUserOrderService.addToCart(requestData);
            console.log("장바구니 추가 성공");
            onClose();
        } catch (error) {
            console.error("장바구니 추가 중 오류 발생:", error);
            if (error.response) {
                console.error("서버 응답 오류:", error.response.data);
            }
            alert("장바구니 추가에 실패했습니다.");
        }
    };


    // 카테고리별로 옵션 선택하기
        const handleOptionChange = (optionName, option) => {
            setSelectedOption(prevSelectedOptions => ({
                ...prevSelectedOptions,
                [optionName]: option,
            }));
        };

        // 그룹화된 옵션을 표시
        useEffect(() => {
            if (options.length > 0) {
                const grouped = groupOptionsByName(options);
                setGrouped(grouped);
            }
        }, [options]);

        return (
            <div className="user-menu-option-modal-container">
                <div className="user-title">메뉴 상세</div>
                <img src={defaultDetailImage} className="order-option-photo" alt="메뉴 사진"/>
                <div className="user-order-description">{menuDescription}</div>
                <div className="user-cart-grid">
                    <div className="user-order-bordtext">가격</div>
                    <div className="user-order-bordtext">{menuPrice}원</div>
                </div>
                <hr className="user-order-hr"/>

                <form className="user-order-option-modal">
                    {Object.keys(grouped).length > 0 ? (
                        Object.entries(grouped).map(([optionName, options]) => (
                            <UserMenuOptionGroup
                                key={optionName}
                                optionName={optionName}
                                options={options}
                                selectedOption={selectedOption[optionName]} // 선택된 옵션 전달
                                onOptionChange={handleOptionChange}  // 변경 시 상태 업데이트
                            />
                        ))
                    ) : (
                        <div className="user-order-description">옵션이 없는 메뉴입니다. 멘트를 넣을지 고민 없이 가도 괜찮을듯</div>
                    )}
                </form>
                <div className="user-order-click-btn">
                    <button type="submit" className="user-mini-btn" onClick={handleAddToCart}>장바구니추가</button>
                    <button type="submit" className="user-mini-btn">주문하기</button>
                </div>
            </div>
        )
    }
;

export default UserMenuOptionModal;