const UserMenuCategory = ({ categoryName, menus, onMenuClick }) => {
    return (
        <div className="menu-category">
            <h3>{categoryName}</h3>
            <div className="menu-list">
                {menus.map((menu) => (
                    <div key={menu.menuId} className="menu-item" onClick={() => onMenuClick(menu)}>
                        <img src={menu.menuPictureUrl || "https://i.imgur.com/placeholder.png"} alt={menu.menuName} />
                        <div className="menu-name">{menu.menuName}</div>
                        <div className="menu-price">{menu.menuPrice.toLocaleString()}원</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
 export default UserMenuCategory;