import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const managementLinks = [
    { text: "메뉴 수정", path: "/owner/menu" },
    { text: "옵션 관리", path: "/owner/menuoption" },
    { text: "내 가게 정보보기", path: "/owner/mystore" }
];

const StoreManagement = ({ ownerName }) => {
    return (
        <div className="store-management text-center p-3">
            <p className="fw-bold fs-5">{ownerName}님 어서오세요.</p>
            <div className="row g-3">
                {managementLinks.map((item, index) => (
                    <div key={index} className="col-4">
                        <Link to={item.path} className="manage-box">
                            {item.text}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <LogoutButton />
            </div>
        </div>
    );
};

export default StoreManagement;
