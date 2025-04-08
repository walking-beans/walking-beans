import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import OrderDetailCard from "../../components/owner/OrderDetailCard";
import MsgToast from "../../components/owner/MsgToast";
import "./StoreOrderCss.css";


const StoreOrder= () => {
    const {id} = useParams(); // 가게 아이디
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("progress"); // 탭 상태: "progress" 또는 "completed"
    const [selectedOrder, setSelectedOrder] = useState(null); // 모달에 보여줄 주문
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
    const [toastMsg, setToastMsg] = useState("");// 안내 메세지
    const [storeCookTime, setStoreCookTime] = useState(5); // 가게 기본 조리시간

    // 시간 변환하기 함수
    const parseDateString = (dateString) => {
        return new Date(dateString.replace(" ", "T")); // '2025-03-25 15:25:40' → '2025-03-25T15:25:40'
    };
    // 예상 시간 계산 함수 minutes 만큼 현재시간에서 더해서 표시!
    const estimatedCookTime = (orderCreateDate, cookTime) => {
        if (!orderCreateDate) return "시간 없음"; // 예외 처리
        const orderTime = parseDateString(orderCreateDate);
        if (!orderTime || isNaN(orderTime.getTime())) return "잘못된 시간";
        orderTime.setMinutes(orderTime.getMinutes() + cookTime);
        return orderTime.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const connectWebSocket = () =>{
        // 웹소켓 상태값 2이상시 표시
        const socket = new WebSocket("ws://localhost:7070/ws/orders");

        socket.onopen = () => {
            console.log("웹소켓 연결 성공 : 주문역활 2 이상 알림용");
        };

        socket.onmessage = (event) => {
            const newOrder = JSON.parse(event.data); // 메세지로 들어온 string json js객체로 전환
            console.log("받은 데이터:", newOrder);

                setOrders((prevOrders) => {
                    // 기존주문에서 동일한 주문id 찾기
                    const orderIndex = prevOrders.findIndex( // 찾으면 인덱스 없으면 -1 리턴
                        (order) => order.orderId === newOrder.orderId);
                    if (orderIndex === -1 ) { // 인덱스가 없으면 새 주문 추가
                        console.log("새 주문이 들어왔어요", newOrder);
                        return [
                            {
                                newOrder,
                                estimatedTime: estimatedCookTime(newOrder.orderCreateDate, storeCookTime),// 시간 갱신 방지
                            },
                                ...prevOrders
                        ];// 새 주문이 위쪽으로 오개
                    }
                    // 기존 주문 상태만 업데이트
                    console.log("주문상태가 변경되었어요", newOrder);
                    const updatedOrders = [...prevOrders]; // 얕은 복사를 통해 새배열 생성 <- 랜더링 트리거를 위해서
                       updatedOrders[orderIndex] = { //orderIndex 위치의 객체를 새객체로 변경
                           ...updatedOrders[orderIndex], // 기존객체를 복사,
                           orderStatus: newOrder.orderStatus // 상태값만 변경
                       }
                    return updatedOrders.sort((a, b) => b.orderId - a.orderId);// 내림차순 정렬 큰주문번호가 무조건 최신 주문이라 가정.
                });

        };
        socket.onclose = () => {
            console.log("웹소켓 연결 종료 : 주문역활 업데이트 종료");
        };
        socket.onerror = (error) => {
            console.log("웹소켓 에러: 주문역활 업데이트 ", error);
            // 재연결 시도
            setTimeout(connectWebSocket, 1000); // 1초 후 재연결
        };
        return () => {
            socket.close();
        };
    }


    useEffect(() => {

        // 최초 로딩시 모든 주문 로딩 , 주문상태 필터 없음
        axios
            .get(`http://localhost:7070/api/orders/store/${id}`)
            .then( (res)=>{
                const initialOrders = res.data.map((order) => ({ // 시간추가를 위한 추가 로직
                    ...order,
                estimatedTime: estimatedCookTime(order.orderCreateDate, storeCookTime), // 초기 주문에도 시간 추가
                }));
                setOrders(initialOrders)
                console.log("전체리스트 로딩 성공 : ",res.data);
            })
            .catch((err)=>{
                console.log("주문정보리스트 전체 조회 로딩에러발생 : ",err);
            })
        connectWebSocket();
    }, []);

    useEffect(() => {
        console.log("렌더링 후 orders:", orders);
    }, [orders]);

    // 진행상황 필터링
    const progressOrders = orders.filter(
        (order) => order.orderStatus >= 2 && order.orderStatus <= 5
    )
    const completedOrders = orders.filter(
        (order) => order.orderStatus >= 6
    )

    // 모달 열기
    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    //주문 상태 텍스트로 변환
    const getStatusText = (status) => {
        switch (status) {
            case 2: return "주문 요청";
            case 3: return "주문 조리중";
            case 4: return "조리 완료";
            case 5: return "라이더 픽업 완료";
            case 6: return "배달 완료";
            default: return "알 수 없음";
        }
    };

    // 주문상태 변경, 안내 메세지 포함
    const handleOrderStatus = (orderId,orderStatus) => {
        axios
            .patch(`http://localhost:7070/api/orders/${orderId}/store/${id}`,
                orderStatus,
                {withCredentials: true,
                    headers: { "Content-Type": "application/json" }},
                )
            .then((res)=>{
                console.log("주문상태 업데이트 완료:", res)
                if(orderStatus === 3){
                    setToastMsg("주문이 수락되었습니다.");
                } else if(orderStatus === 4) {
                    setToastMsg("조리완료 확인되었습니다. 주문번호 확인 후 라이더님에게 전달해주세요.");
                } else {// 다른값이 들어갔을 경우 예외처리
                    setToastMsg("주문상태 변경중 문제가 발생했습니다. 고객센터로 문의주세요.");
                }
            })
            .catch((err)=>{
                console.log("상태 업데이트 실패 :",err)
            })
    }

    // 시간 설정
    const handleCookTimeChange = (e) => {
        const newCooktime = parseInt(e.target.value) || 0;
        setStoreCookTime(newCooktime);
    }





    return(
        <>
            {/* 탭 UI */}
            <div className="tab-container">
                <button
                    className={`tab-button ${activeTab === "progress" ? "active" : ""}`}
                    onClick={() => setActiveTab("progress")}
                    style={{
                        fontWeight: activeTab === "progress" ? "bold" : "normal",
                    }}
                >
                    진행 중인 주문
                </button>
                <button
                    className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
                    onClick={() => setActiveTab("completed")}
                    style={{
                        fontWeight: activeTab === "completed" ? "bold" : "normal",
                    }}
                >
                    완료된 주문
                </button>
            </div>

            {/* 필터링된 주문 렌더링 */}
            {activeTab === "progress" ? (
                progressOrders.map((order) => (
                    <div key={order.orderId}>
                        <div className="order-card">
                            {/* 주문 정보 (시간, 주문번호) */}
                            <div className="order-info">
                                <span>{order.estimatedTime}</span>
                                <span className="order-number">{order.orderNumber}</span>

                            </div>

                            {/* 주문 상세 정보 */}
                            <div className="order-details">
                                {order.orderStatus === 2 && (<h3>새로운 주문!</h3>)}
                                <p>상태 : {getStatusText(order.orderStatus)}</p>
                            </div>

                            {/* 액션 버튼 */}
                            <div className="order-actions">
                                <button className="detail-btn" onClick={() => openModal(order)}>자세히 보기</button>
                                {order.orderStatus === 2 && (
                                    <button className="storeOrder-accept-btn"
                                            onClick={() => handleOrderStatus(order.orderId, 3)}>접수하기</button>
                                )}
                                {order.orderStatus === 3 && (
                                    <button className="storeOrder-complete-btn"
                                            onClick={() => handleOrderStatus(order.orderId, 4)}>조리완료</button>
                                )}
                                {order.orderStatus === 4 && (
                                    <button className="storeOrder-complete-btn"
                                            >배차 중</button>
                                )}
                                {order.orderStatus === 5 && (
                                    <button className="storeOrder-finished-btn"
                                    >픽업완료</button>
                                )}
                                {order.orderStatus === 6 && (
                                    <button className="storeOrder-finished-btn"
                                    >배달완료</button>
                                )}

                            </div>
                        </div>
                    </div>
                ))
            ) : (
                completedOrders.map((order) => (
                    <div key={order.orderId}>
                        <div className="order-card">
                            {/* 주문 정보 (시간, 주문번호) */}
                            <div className="order-info">
                                <span>{order.estimatedTime}</span>
                                <span className="order-number">{order.orderNumber}</span>

                            </div>

                            {/* 주문 상세 정보 */}
                            <div className="order-details">
                                {order.orderStatus === 2 && (<h3>새로운 주문!</h3>)}
                                <p>상태 : {getStatusText(order.orderStatus)}</p>
                            </div>

                            {/* 액션 버튼 */}
                            <div className="order-actions">
                                <button className="detail-btn" onClick={() => openModal(order)}>자세히 보기</button>
                                {order.orderStatus === 2 && (
                                    <button className="storeOrder-accept-btn"
                                            onClick={() => handleOrderStatus(order.orderId, 3)}>접수하기</button>
                                )}
                                {order.orderStatus === 3 && (
                                    <button className="storeOrder-complete-btn"
                                            onClick={() => handleOrderStatus(order.orderId, 4)}>조리완료</button>
                                )}
                                {order.orderStatus === 4 && (
                                    <button className="storeOrder-complete-btn"
                                    >배차 중</button>
                                )}
                                {order.orderStatus === 5 && (
                                    <button className="storeOrder-finished-btn"
                                    >픽업완료</button>
                                )}
                                {order.orderStatus === 6 && (
                                    <button className="storeOrder-finished-btn"
                                    >배달완료</button>
                                )}

                            </div>
                        </div>
                    </div>
                ))
            )}
            {/* 상태변경 메세지 */}
            <div style={{position: "relative", maxWidth: "800px", margin: "0 auto"}}>
                {toastMsg && (
                    <MsgToast
                        message={toastMsg}
                        onClose={() => setToastMsg("")}/>
                )}
            </div>
            {/* 모달 컴포넌트 */}
            {isModalOpen && (
                <OrderDetailCard order={selectedOrder} onClose={closeModal} handleOrderStatus={handleOrderStatus}/>
            )}
        </>
    )
}

export default StoreOrder;