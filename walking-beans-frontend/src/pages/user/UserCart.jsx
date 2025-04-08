import React from "react";
import apiUserOrderService from "../../service/apiUserOrderService";
import orderCartDeleteBtnIconMini from "../../assert/images/user/orderCartDeleteBtnIconMini.svg";

const UserCart = ({
                      cartId,
                      menuNames,
                      menuPrices,
                      optionNames,
                      optionPrices,
                      totalQuantities,
                      optionContents,
                      handleDelete,
                      userId,
                      updateCart,
                  }) => {
    // , 붙여서 데이터 조회
    const menuList = menuNames ? menuNames.split(",") : [];
    const priceList = menuPrices ? menuPrices.split(",").map(Number) : [];
    const optionList = optionNames ? optionNames.split(",") : [];
    const optionContentList = optionContents ? optionContents.split(",") : [];
    const optionPriceList = optionPrices ? optionPrices.split(",").map(Number) : [];
    const quantityList = totalQuantities ? totalQuantities.split(",").map(Number) : [];

    const handleQuantityChange = async (newQuantity, itemIndex) => {
        const currentQuantity = quantityList[itemIndex];

        // 메뉴 삭제
        if (newQuantity < 1) {
            if (currentQuantity === 1) {
                const shouldDelete = window.confirm("메뉴를 삭제하시겠습니까?");
                if (shouldDelete) {
                    handleDelete(cartId);
                }
            }
            return;
        }

        // 메뉴 수량 변경
        try {
            await apiUserOrderService.updateCartQuantity(cartId, newQuantity);

            const updatedCart = await apiUserOrderService.getUserCartByUserId(userId);
            updateCart(updatedCart);
        } catch (error) {
            console.error("장바구니 수량 변경 실패:", error);
        }
    };

    return (
        <div>
            {menuList.map((menu, index) => {
                // 배열 길이 일치하지 않을 경우 return
                if (!priceList[index] || !quantityList[index]) return null;

                const menuPrice = priceList[index] || 0;
                const options = optionList || []; // 옵션 이름 배열
                const optionContents = optionContentList || []; // 옵션 내용 배열
                const optionPrices = optionPriceList || []; // 옵션 가격 배열
                const quantity = quantityList[index] || 1;

                // 총 옵션 가격 계산
                const totalOptionPrice = options.reduce((sum, _, optionIndex) => {
                    return sum + (optionPrices[optionIndex] || 0);
                }, 0);

                // 총 가격 계산
                const totalPrice = (menuPrice + totalOptionPrice) * quantity;

                return (
                    <div key={index} className="user-cart-container">
                        <div className="user-cart-grid">
                            <div className="user-cart-pricetext">{menu}</div>
                            <div className="user-cart-pricetext">{totalPrice.toLocaleString()}원</div>
                        </div>

                        <div className="user-cart-options">
                            <div>
                                {options.length > 0 ? (
                                    options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="user-cart-detailtext">
                                            {`${option} ${optionContents[optionIndex] || ''}`}
                                            {` (+${(optionPrices[optionIndex] || 0).toLocaleString()}원)`}
                                        </div>
                                    ))
                                ) : null}
                            </div>

                            <div className="user-cart-quantity-line">
                                {/* 수량 버튼 1개일 때 휴지통 아이콘 생성 */}
                                {quantity === 1 ? (
                                        <div className="user-cart-quantity">
                                            <button
                                                className="user-cart-remove"
                                                onClick={() => handleDelete(cartId)} // 1개 남았을 때 삭제
                                            >
                                                <img src={orderCartDeleteBtnIconMini} alt="장바구니 메뉴 삭제 버튼"/>
                                            </button>
                                            <span className="user-cart-quantity-text">{quantity}</span>
                                            <button
                                                className="user-cart-quantity-btn"
                                                onClick={() => handleQuantityChange(quantity + 1, index)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="user-cart-quantity">
                                            <button
                                                className="user-cart-quantity-btn"
                                                onClick={() => handleQuantityChange(quantity - 1, index)}
                                            >
                                                −
                                            </button>
                                            <span className="user-cart-quantity-text">{quantity}</span>
                                            <button
                                                className="user-cart-quantity-btn"
                                                onClick={() => handleQuantityChange(quantity + 1, index)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    );
};

export default UserCart;
