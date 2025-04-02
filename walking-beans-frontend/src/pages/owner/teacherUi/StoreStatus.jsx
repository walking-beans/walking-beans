import { Link } from "react-router-dom";



const StoreStatus = ({ weather, orders, storeStatus , storeId}) => {

    const statusLinks = [
        { text: "주문 준비중", path: `/owner/${storeId}/order` },
        { text: "완료된 주문", path: "/owner/order?role=5" },
        { text: "임시영업중지", path: "/owner/mystore" },
        { text: "매출조회", path: "/owner/revenue" },
        { text: "일정관리", path: "/owner/mystore" },
        { text: "알림", path: "/alarmlist" }
    ];

    return (
        <div className="store-status text-center p-3">
            <div className="status-header d-flex justify-content-between align-items-center px-3">
                <span className="status-badge">{storeStatus}</span>
                <span className="weather-badge">날씨: {weather.condition} {weather.temperature}°C</span>
            </div>
            <div className="row g-3 mt-3">
                {statusLinks.map((item, index) => (
                    <div key={index} className="col-4">
                        <Link to={item.path} className="manage-box">
                            {item.text}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreStatus;
