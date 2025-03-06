import React from "react";
import defaultImage from "../../images/user/defaultimage.svg"


const StoreMenuForm = ({menuName, onAddToCart, menuPrice, storeId, menuCategory}) => {

    return (
        <div>
            <div onClick={() => onAddToCart(storeId)}>
                <div><img src={defaultImage} alt="메뉴 이미지"/></div>
                <div>{menuName}</div>
                <div>{Number(menuPrice).toLocaleString()}원</div>
            </div>
        </div>
    )
};
export default StoreMenuForm;