import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import OrderDetailCard from "../../components/owner/OrderDetailCard";
import MsgToast from "../../components/owner/MsgToast";


const StoreOrder= () => {
    const {id} = useParams(); // 가게 아이디
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("progress"); // 탭 상태: "progress" 또는 "completed"
    const [selectedOrder, setSelectedOrder] = useState(null); // 모달에 보여줄 주문
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
    const [toastMsg, setToastMsg] = useState("");// 안내 메세지

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
                        return [newOrder, ...prevOrders];// 새 주문이 위쪽으로 오개
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
                setOrders(res.data)
                console.log("전체리스트 로딩 성공 : ",res.data);
            })
            .catch((err)=>{
                console.log("주문정보리스트 전체 조회 로딩에러발생 : ",err);
            })
        connectWebSocket();
        console.log("렌더링 후 orders:", orders);
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
                {"orderStatus": orderStatus},
                {withCredentials: true},
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

    return(
        <>
            {/* 탭 UI */}
            <div>
                <button
                    onClick={() => setActiveTab("progress")}
                    style={{
                        fontWeight: activeTab === "progress" ? "bold" : "normal",
                    }}
                >
                    진행 중인 주문
                </button>
                <button
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
                        <div>
                            {order.orderStatus === 2 && (<h3>새로운 주문!</h3>)}
                        <p>주문번호 : {order.orderNumber}</p>
                        <p>상태 : {getStatusText(order.orderStatus)}</p>
                        </div>
                        <div className="order-actions">
                            {order.orderStatus === 2 && (
                                <button className="action-btn accept-btn" onClick={()=>handleOrderStatus(order.orderId,3)}>
                                    주문 수락
                                </button>
                            )}
                            {order.orderStatus === 3 && (
                                <button className="action-btn complete-btn" onClick={()=>handleOrderStatus(order.orderId,4)}>
                                    조리 완료
                                </button>
                            )}
                        <button className="detail-btn" onClick={() => openModal(order)}>자세히 보기</button>
                        </div>
                    </div>
                ))
            ) : (
                completedOrders.map((order) => (
                    <div key={order.orderId}>
                        <h3>주문 번호: {order.orderNumber}</h3>
                        <p>상태: {getStatusText(order.orderStatus)}</p>
                        <button className="detail-btn" onClick={() => openModal(order)}>자세히 보기</button>
                    </div>
                ))
            )}
            {/* 상태변경 메세지 */}
            <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
            {toastMsg && (
                <MsgToast
                    message={toastMsg}
                    duration={3000}
                    onClose={() => setToastMsg("")} />
            )}
            </div>
            {/* 모달 컴포넌트 */}
            {isModalOpen && (
                <OrderDetailCard order={selectedOrder} onClose={closeModal} />
            )}
        </>
    )
}

export default StoreOrder;