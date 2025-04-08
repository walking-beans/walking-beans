import React from "react";
import "../../css/Owner.css"

// 메뉴 컴포넌트
const UserMenuForm = ({ menuName, menuPrice, onClick, menuPictureUrl }) => {
    return (
        <div onClick={onClick} className="user-menu-form-container">
            <div className="user-menu-photo">
                <img src={menuPictureUrl} alt="메뉴 이미지"/>
            </div>
            <div className="store-menu-title">{menuName}</div>
            <div className="store-menu-price">{Number(menuPrice).toLocaleString()}원</div>
        </div>
    );
};
export default UserMenuForm;