import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";


const StoreManagement = ({ ownerName , storeId} ) => {

    const managementLinks = [
        { text: "메뉴 수정", path: `/owner/${storeId}/menu` },
        { text: "옵션 관리", path: `/owner/${storeId}/menu` },
        { text: "내 가게 정보보기", path: `/owner/${storeId}/mystore` }
    ];

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
