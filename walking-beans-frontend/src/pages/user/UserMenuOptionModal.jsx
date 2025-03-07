import "../../css/Order.css";
import "../../css/Cart.css";
import UserMenuOption from "./UserMenuOption";
import UserMenuOptionGroup from "./UserMenuOptionGroup"
import defaultDetailImage from "../../images/user/defaultDetailImage.svg";
import React, {useEffect, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";

const UserMenuOptionModal = ({menuPrice}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [options, setOptions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창에서 옵션 선택하기
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    // 메뉴 id로 옵션 가져오기
    useEffect(() => {
        if (selectedMenu?.menuId) {
            apiUserOrderService.getOptionsByMenuId(selectedMenu.menuId, setOptions)
        }
    }, [selectedMenu]);


    // 장바구니에 추가 선택 시 장바구니에 넣기
    const addToCart = async () => {
        if (!selectedMenu || !selectedOption) {
            alert("옵션을 선택해주세요.");
            return;
        }

        const cartData = {
            menuId: selectedMenu.menuId,
            optionId: selectedOption.optionId,
            menuPrice: selectedMenu.menuPrice,
            optionPrice: selectedOption.optionPrice,
        };
        try {
            await apiUserOrderService.addToCart(cartData);
            alert("장바구니에 추가되었습니다!");
            setModalOpen(false); // 모달 닫기
        } catch (error) {
            console.error("장바구니 추가 중 오류 발생:", error);
        }
    };

    return (
        <div className="userMenuOptionModal-container">
            <div className="user-cart-title">메뉴 상세</div>
            <img src={defaultDetailImage} alt="메뉴 사진"/>
            <div className="user-cart-grid">
                <div className="user-cart-bordtext">가격</div>
                <div className="user-cart-bordtext">+{menuPrice}원</div>
            </div>
            <hr className="user-order-hr"/>

            <form className="user-order-option-modal">
                <UserMenuOptionGroup>
                    {options.map((option) => (
                        <UserMenuOption key={option.optionId}>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value={option.optionId}
                                    onChange={() => handleOptionChange(option)}
                                />
                                {option.optionName} (+{option.optionPrice}원)
                            </label>
                        </UserMenuOption>
                    ))}
                </UserMenuOptionGroup>
            </form>
            <div className="user-order-click-btn">
                <button type="submit" className="user-order-mini-btn" onClick={addToCart}>장바구니추가</button>
                <button type="submit" className="user-order-mini-btn">주문하기</button>
            </div>
        </div>
    )
};

export default UserMenuOptionModal;