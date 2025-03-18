const LogoutButton = () => {
    const handleLogout = () => {
        alert("로그아웃 되었습니다.");
    };

    return (
        <div className="logout-container">
            <button className="btn logout-btn" onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default LogoutButton;
