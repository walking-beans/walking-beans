import React from "react";
import defaultImage from "../../images/user/defaultimage.svg";
import "../../css/Owner.css"

const StoreMenuForm = ({ menuName, menuPrice, onClick }) => {
    return (
        <div onClick={onClick} className="store-menu-form-container">
            <div>
                <img src={defaultImage} alt="메뉴 이미지" />
            </div>
            <div className="store-menu-title">{menuName}</div>
            <div className="store-menu-price">{Number(menuPrice).toLocaleString()}원</div>
        </div>
    );
};
export default StoreMenuForm;