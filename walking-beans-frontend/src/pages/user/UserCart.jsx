import React from "react";
import orderCartDeleteBtnIcon from "../../images/user/orderCartDeleteBtn.svg";
import apiUserOrderService from "../../service/apiUserOrderService";
import axios from "axios";

const UserCart = ({
                      cartId,
                      menuNames,
                      menuPrices,
                      optionNames,
                      optionPrices,
                      totalQuantities,
                      handleDelete,
                      userId,
                      storeId,
                      optionIds,
                      updateCart,
                  }) => {
    const menuList = menuNames ? menuNames.split(",") : [];
    const priceList = menuPrices ? menuPrices.split(",").map(Number) : [];
    const optionList = optionNames ? optionNames.split(",") : [];
    const optionPriceList = optionPrices ? optionPrices.split(",").map(Number) : [];
    const quantityList = totalQuantities ? totalQuantities.split(",").map(Number) : [];
    const optionIdsList = optionIds ? optionIds.split(",") : [];

    const handleQuantityChange = async (newQuantity, itemIndex) => {
        const currentQuantity = quantityList[itemIndex];

        if (newQuantity < 1) {
            if (currentQuantity === 1) {
                const shouldDelete = window.confirm("메뉴를 삭제하시겠습니까?");
                if (shouldDelete) {
                    handleDelete(cartId);
                }
            }
            return;
        }

        try {
            await apiUserOrderService.updateCartQuantity(cartId, newQuantity);

            const updatedCart = await apiUserOrderService.getUserCartByUserId(userId);
            updateCart(updatedCart);
        } catch (error) {
            console.error("장바구니 수량 변경 실패:", error);
        }
    };

    return (
        <div className="user-cart-container">
            {menuList.map((menu, index) => {
                const menuPrice = priceList[index] || 0;
                const option = optionList[index] || "옵션 없음";
                const optionPrice = optionPriceList[index] || 0;
                const quantity = quantityList[index] || 1;
                const totalPrice = (menuPrice + optionPrice) * quantity;

                return (
                    <div key={index} className="user-cart-item">
                        <div className="user-cart-grid">
                            <div className="user-cart-bordtext">{menu}</div>
                            <div className="user-cart-bordtext">{totalPrice.toLocaleString()}원</div>
                        </div>

                        {option !== "옵션 없음" && (
                            <div className="user-cart-detailtext">
                                {option} (+{optionPrice.toLocaleString()}원)
                            </div>
                        )}

                        <div className="user-cart-controls">
                            <div className="user-cart-quantity">
                                <button
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(quantity - 1, index)}
                                >−</button>
                                <span className="quantity-number">{quantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(quantity + 1, index)}
                                >+</button>
                            </div>

                            <button className="user-cart-remove" onClick={() => handleDelete(cartId)}>
                                <img src={orderCartDeleteBtnIcon} alt="장바구니 메뉴 삭제 버튼"/>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserCart;
