const UserMainMenuForm = ({ menuName, menuPrice, menuPictureUrl, onClick }) => {
    return (
        <div className="menu-item" onClick={onClick}>
            <img src={menuPictureUrl || "https://i.imgur.com/placeholder.png"} alt={menuName} />
            <div className="menu-name">{menuName}</div>
            <div className="menu-price">{menuPrice.toLocaleString()}원</div>
        </div>
    );
};
export default UserMainMenuForm;