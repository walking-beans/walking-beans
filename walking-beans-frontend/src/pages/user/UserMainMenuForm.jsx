import defaultImage from "../../images/user/defaultimage.svg";
import "../../css/Owner.css"
import React from "react";

const UserMainMenuForm = ({menuName, onClick, menuPrice, menuDescription}) => {
    return (
        <div className="user-main-menu-container" onClick={onClick}>
            <div>
                <img src={defaultImage} alt="메인메뉴 이미지"/>
            </div>
            <div className="store-menu-title">{menuName}</div>
            <div className="store-menu-price">{Number(menuPrice).toLocaleString()}원</div>
        </div>
    )
};

export default UserMainMenuForm;