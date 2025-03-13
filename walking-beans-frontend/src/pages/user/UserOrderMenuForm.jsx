import orderCartDeleteBtnIcon from "../../images/user/orderCartDeleteBtn.svg"
import "../../css/Cart.css"

import React from "react";


const UserOrderMenuForm = ({cartId, menuName, menuPrice, optionName, optionPrice, handleDelete, optionContent}) => {

    const totalPrice = Number(menuPrice) + Number(optionPrice);
    return (
        <div>
            <div className="user-order-menu-form">
                <div>
                    <div className="user-order-basic-text-m-0">{menuName}</div>
                    <div className="store-menu-price">{optionContent}(+{Number(optionPrice).toLocaleString()}원)</div>
                    <div className="user-order-basic-text-m-0">{totalPrice.toLocaleString()}원</div>
                </div>

                <div>
                    <button className="user-cart-remove" onClick={() => handleDelete(cartId)}>
                        <img src={orderCartDeleteBtnIcon} alt="장바구니 메뉴 삭제 버튼 아이콘"/>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default UserOrderMenuForm;