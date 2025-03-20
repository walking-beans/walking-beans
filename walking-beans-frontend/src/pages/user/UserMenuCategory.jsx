import React from "react";
import UserMenuForm from "./UserMenuForm";
import defaultDetailImage from "../../images/user/defaultDetailImage.svg";

const UserMenuCategory = ({ categoryName, menus, onMenuClick }) => {
    return (
        <div className="menu-category-container">
            <div className="user-order-hr" alt="구분선"></div>
            <h3 className="user-cart-bordtext">{categoryName}</h3>
            <div className="user-order-menuinfo">
                {menus.map((menu) => (
                    <UserMenuForm
                        key={menu.menuId}
                        menuName={menu.menuName}
                        menuPrice={menu.menuPrice}
                        menuPictureUrl={menu.menuPictureUrl || defaultDetailImage}
                        onClick={() => onMenuClick(menu)}
                    />
                ))}
            </div>
        </div>
    );
}

export default UserMenuCategory;