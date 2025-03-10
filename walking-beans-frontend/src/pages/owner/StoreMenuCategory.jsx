import StoreMenuForm from "./StoreMenuForm";

const StoreMenuCategory = ({ categoryName, menus, onMenuClick }) => {
    return (
        <div className="menu-category-container">
            <h3 className="menu-category-title">{categoryName}</h3>
            <div className="menu-list">
                {menus.map((menu) => (
                    <StoreMenuForm
                        key={menu.menuId}
                        menuName={menu.menuName}
                        menuPrice={menu.menuPrice}
                        onClick={() => onMenuClick(menu)}
                    />
                ))}
            </div>
        </div>
    );
}

export default StoreMenuCategory;