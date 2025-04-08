import apiUserOrderService from "../../service/apiUserOrderService";
import orderCartDeleteBtnIconMini from "../../assert/images/user/orderCartDeleteBtnIconMini.svg";

const UserSelectMenu = ({
                            cartId,
                            menuNames,
                            menuPrices,
                            optionNames,
                            optionPrices,
                            totalQuantities,
                            optionContents,
                            handleDelete,
                            userId,
                            optionIds,
                            updateCart,
                        }) => {
    const menuList = menuNames ? menuNames.split(",") : [];
    const priceList = menuPrices ? menuPrices.split(",").map(Number) : [];
    const optionList = optionNames ? optionNames.split(",") : [];
    const optionContentList = optionContents ? optionContents.split(",") : [];
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
                    <div key={index} className="user-select-menu-container">
                        <div className="user-select-mid-text">{menu}</div>
                        <div className="user-select-options">
                            <div>
                                {options.length > 0 ? (
                                    options.map((option, optionIndex) => {
                                        const isLastOption = optionIndex === options.length - 1;
                                        return (
                                            <span key={optionIndex} className="user-cart-detailtext">
                                                { `${option} ${optionContents[optionIndex] || ''}`}
                                                { `(+${(optionPrices[optionIndex] || 0).toLocaleString()}원)`}
                                                {!isLastOption && ', '}
                                            </span>
                                        );
                                    })
                                ) : null}
                                <div className="user-select-mid-text">{totalPrice.toLocaleString()}원</div>
                            </div>

                            <div className="user-cart-quantity-line">
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

export default UserSelectMenu;