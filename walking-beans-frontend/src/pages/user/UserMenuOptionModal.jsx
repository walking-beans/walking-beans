import UserMenuOptionGroup from "./UserMenuOptionGroup";
import defaultDetailImage from "../../assert/images/user/defaultDetailImage.svg";
import React, {useEffect, useRef, useState} from "react";
import apiUserOrderService from "../../service/apiUserOrderService";

// 옵션 모달 컴포넌트
const UserMenuOptionModal = ({menu, userId, onClose, updateCart, handleOrderNow}) => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [options, setOptions] = useState([]);
    const [grouped, setGrouped] = useState({});
    const modalBodyRef = useRef(null);

    // 메뉴옵션 가져오기
    useEffect(() => {
        if (userId && menu?.menuId) {
            apiUserOrderService.getOptionsByMenuId(menu.menuId, (data) => {
                setOptions(data);
            });
        }
    }, [menu]);

    // 옵션 카테고리별로 정리
    useEffect(() => {
        if (options.length > 0) {
            const groupedOptions = options.reduce((acc, option) => {
                if (!acc[option.optionName]) acc[option.optionName] = [];
                acc[option.optionName].push(option);
                return acc;
            }, {});
            setGrouped(groupedOptions);
        }
    }, [options]);

    // 옵션 선택 버튼
    const handleOptionChange = (optionName, option) => {
        setSelectedOptions((prev) => {
            // 해당 옵션 그룹에 대한 현재 선택 상태 가져오기
            const newSelectedOptions = {...prev};

            if (option === null) {
                delete newSelectedOptions[optionName];
            } else {
                newSelectedOptions[optionName] = [option];
            }
            return newSelectedOptions;
        });
    };

    // 장바구니 담기
    const handleAddToCart = async () => {
        if (!userId || userId === 'undefined') {
            alert("사용자 인증이 필요합니다.");
            return;
        }

        const allSelectedOptions = Object.values(selectedOptions).flat();
        const optionIds = allSelectedOptions.map(option => option.optionId);
        const optionIdsString = optionIds.join(",");

        // 주문(order)이 아직 생성되지 않았기 때문에 cartId, orderId는 기본값으로 설정하고, 메뉴와 옵션 정보를 포함시킴
        const cartData = {
            cartId: 0,
            menuId: menu.menuId,
            optionId: optionIdsString,
            orderId: 0,
            storeId: menu.storeId,
            userId: userId,
            cartQuantity: 1,
        };

        try {
            await apiUserOrderService.addToCart(cartData);
            const updatedCart = await apiUserOrderService.getUserCartByUserId(userId);
            updateCart(updatedCart);
            onClose();
        } catch (error) {
            alert("장바구니 추가에 실패했습니다.");
        }
    };

    return (
        <div>
            <div className="user-title">{menu?.menuName || "메뉴 상세"}</div>
            <div className="order-option-photo">
                <img src={menu?.menuPictureUrl || defaultDetailImage} alt="메뉴 사진"/>
            </div>
            <div className="user-order-description">{menu?.menuDescription}</div>

            <div className="user-cart-grid">
                <div className="user-order-bordtext">가격</div>
                <div className="user-order-bordtext">{menu?.menuPrice.toLocaleString()}원</div>
            </div>
            <hr className="user-order-hr"/>

            <div className="user-order-option-modal" ref={modalBodyRef}>
                {Object.keys(grouped).length > 0 ? (
                    Object.entries(grouped).map(([optionName, options]) => (
                        <UserMenuOptionGroup
                            key={optionName}
                            optionName={optionName}
                            options={options}
                            selectedOptions={selectedOptions[optionName]}
                            onOptionChange={handleOptionChange}
                        />
                    ))
                ) : (
                    <div className="user-order-description">옵션이 없는 메뉴입니다.</div>
                )}
            </div>

            <div className="user-order-click-btn">
                <button type="submit" className="user-mini-btn" onClick={handleAddToCart}>장바구니추가</button>
                <button type="submit" className="user-mini-btn" onClick={handleOrderNow}>주문하기</button>
            </div>
        </div>
    );
};

export default UserMenuOptionModal;
