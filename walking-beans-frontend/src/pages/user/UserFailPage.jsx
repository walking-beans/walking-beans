import {useNavigate, useSearchParams} from "react-router-dom";
import failIcon from "../../assert/images/user/failIcon.svg"

export function UserFailPage() {
    const [searchParams] = useSearchParams();
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.user_id : null;
    const navigate = useNavigate();

    return (
        <div className="user-order-background">
            <div className="user-order-loading">
                <img
                    src={failIcon}
                />
                <h2 className="user-title-center mb-4">결제를 실패했어요</h2>
                <div className="user-order-a-text">
                    <a
                        onClick={() => navigate(`/order/checkout/${userId}`)}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        결제 다시 시도하기
                    </a>
                </div>
            </div>
        </div>
    );
}