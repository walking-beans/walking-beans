import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import OrderDetailCard from "../../components/owner/OrderDetailCard";


const StoreOrder= () => {
    const {id} = useParams();
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("progress"); // 탭 상태: "progress" 또는 "completed"
    const [selectedOrder, setSelectedOrder] = useState(null); // 모달에 보여줄 주문
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태

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
                        <p>{order.orderNumber}</p>
                        <p>{order.orderStatus}</p>
                        <button onClick={() => openModal(order)}>자세히 보기</button>
                    </div>
                ))
            ) : (
                completedOrders.map((order) => (
                    <div key={order.orderId}>
                        <p>{order.orderNumber}</p>
                        <p>{order.orderStatus}</p>
                        <button onClick={() => openModal(order)}>자세히 보기</button>
                    </div>
                ))
            )}


            {/* 모달 컴포넌트 */}
            {isModalOpen && (
                <OrderDetailCard order={selectedOrder} onClose={closeModal} />
            )}
        </>
    )
}

export default StoreOrder;