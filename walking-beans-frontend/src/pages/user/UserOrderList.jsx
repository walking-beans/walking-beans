import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import apiRiderService from "../../service/apiRiderService";
import detailbtn from "../../assert/images/user/detailbtn.svg";

const UserOrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.user_id : null;
    const [reviewStatus, setReviewStatus] = useState(0);
    const [orderTimeInfo, setOrderTimeInfo] = useState({});

    const status = {
        '2': '매장 확인 중',
        '3': (order) => ({
            text: orderTimeInfo[order.orderNumber]
                ? `${orderTimeInfo[order.orderNumber].timeRemaining}분 후 도착`
                : '조리 중',
            className: 'user-order-big-guide'
        }),
        '4': (order) => ({
            text: orderTimeInfo[order.orderNumber]
                ? `${orderTimeInfo[order.orderNumber].timeRemaining}분 후 도착`
                : '조리 완료',
            className: 'user-order-big-guide'
        }),
        '5': (order) => ({
            text: orderTimeInfo[order.orderNumber]
                ? `${orderTimeInfo[order.orderNumber].timeRemaining}분 후 도착`
                : '배달 중',
            className: 'user-order-big-guide'
        }),
        '6': '배달 완료'
    };

    // 로그인 확인
    useEffect(() => {
        if (!userId) {
            console.warn("유저 정보 없음. 로그인 필요.");
            navigate("/login");
            return;
        }

        // 주문 목록 불러오기
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:7070/api/orders/user/${userId}`);
                setOrders(response.data);
                console.log("주문 목록 : ", response.data);
            } catch (error) {
                console.error("주문 목록을 불러오는 중 오류 발생:", error);
            }
        };
        fetchOrders();
    }, [userId, navigate]);

    // 각 주문의 리뷰 상태 확인
    useEffect(() => {
        if (orders.length > 0) {
            orders.forEach(order => {
                axios.get(`http://localhost:7070/api/reviews/exists/${order.orderId}`)
                    .then(res => {
                        setReviewStatus(orders => ({
                            ...orders,
                            [order.orderId]: res.data
                        }));
                    })
                    .catch(err => console.error("리뷰 상태 확인 오류:", err));
            });
        }
    }, [orders]);

    // 배달 중 남은 시간 가져오기
    useEffect(() => {
        if (orders.length > 0) {
            orders.forEach(order => {
                if (order.orderStatus >= 2 && order.orderStatus <= 5) {
                    // 이제 바로 orderId를 사용
                    apiRiderService.getOrderStatusWithRemainingTime(order.orderId, (timeData) => {
                        setOrderTimeInfo(orders => ({
                            ...orders,
                            [order.orderNumber]: timeData
                        }));
                    });
                }
            });
        }
    }, [orders]);

    return (
        <div className="user-order-background">
            <div className="user-order-menu-container">
                <div>
                    <h2 className="user-title-center">주문내역</h2>
                    <div className="user-order-hr"></div>
                </div>
                {orders.length === 0 ? (
                    <div className="user-order-loading">
                        <div className="user-order-big-text">주문 내역이 없습니다.</div>
                        <div className="user-order-click-btn-one">
                            <button className="user-order-btn-b" onClick={() => {
                                navigate("/")
                            }}>주문하러 가기
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {orders.map((order) => (
                            <div key={order.orderNumber}>
                                <div className="user-order-list-flex">
                                    <img src={order?.storeLogo}
                                         className="order-store-logo"/>
                                    <div className="user-order-list-info">
                                        <div className={
                                            typeof status[order.orderStatus] === 'function' &&
                                            status[order.orderStatus](order).className
                                                ? status[order.orderStatus](order).className
                                                : 'user-order-big-text'
                                        }>
                                            {typeof status[order.orderStatus] === 'function'
                                                ? status[order.orderStatus](order).text
                                                : status[order.orderStatus]}
                                        </div>
                                        <div className="user-order-basic-text-m-0">{order?.storeName}</div>
                                        <div className="user-order-basic-text-m-0">
                                            {order?.orderDate
                                                ? new Date(order.orderDate).toLocaleString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    weekday: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })
                                                    .replace(/\. /g, '-')  // YYYY.MM.DD → YYYY-MM-DD
                                                    .replace(/\./, '')     // 마지막에 남은 점 제거
                                                    .replace(/-(?=\([가-힣]{1}\))/, ' ')  // DD- (날짜 뒤의 `-`만 제거)
                                                : '날짜 정보 없음'}
                                        </div>
                                        <span
                                            className="user-order-basic-text-m-0">{order?.orderList?.split('/')[0]} {order.quantity > 1 ? ` 외 ${order.quantity - 1}개` : ''} {order?.totalPayment.toLocaleString()}원</span>
                                        <Link to={`/order/${order.orderNumber}`}>
                                            <img src={detailbtn} alt="메뉴 상세보기"/>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    {order.orderStatus === 6 ? (
                                            <div className="user-order-click-btn">
                                                {reviewStatus[order.orderId] ? (
                                                    <button className="user-mini-btn-bb"
                                                            onClick={() => navigate(`/user/review/${order.storeId}`)}>
                                                        작성한 리뷰 보기
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="user-mini-btn-b"
                                                        onClick={() => navigate(`/user/reviewWrite/${order.orderId}`, { state: { storeId: order.storeId, riderId: order.riderId_on_duty } })}
                                                    >
                                                        리뷰 작성하기
                                                    </button>
                                                )}
                                                <button className="user-mini-btn-bb" onClick={() => navigate("/chat/chattingroom")}>채팅 문의</button>
                                            </div>
                                        ) : (
                                        <div className="user-order-click-btn-one">
                                            <button className="user-order-btn-b"
                                                    onClick={() => navigate(`/user/delivery/status/${order.orderNumber}`)}>배달
                                                현황 보기
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="user-order-hr"></div>
                            </div>
                        ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserOrderList;
