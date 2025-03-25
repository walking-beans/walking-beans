import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import UserSelectMenu from "./UserSelectMenu";

const UserOrderDetail = () => {
    const {orderNumber} = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [totalMenuPrice, setTotalMenuPrice] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:7070/api/orders/detail/orderNumber/${orderNumber}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    // 기본 주문 정보는 첫 번째 항목에서 가져옴
                    setOrder(response.data[0]);
                    // 상세 내역은 전체 배열 사용
                    setOrderItems(response.data);
                    console.log("주문 데이터 : ", response.data);

                    // 메뉴 가격 계산
                    const menuTotal = orderItems.reduce((sum, item) => {
                        const basePrice = parseInt(item.menuPrice) || 0;
                        const optionPrice = parseInt(item.totalOptionPrice) || 0;
                        const qty = parseInt(item.quantity) || 1;

                        const itemTotal = (basePrice + optionPrice) * qty;
                        console.log(`항목: ${item.menuName}, 가격: ${basePrice}, 옵션: ${optionPrice}, 수량: ${qty}, 소계: ${itemTotal}`);

                        return sum + itemTotal;
                    }, 0);
                    setTotalMenuPrice(menuTotal);

                    // 배달팁 계산 (총합)
                    const totalPrice = orderItems.reduce((sum, item) => {
                        const tip = parseInt(item.storeDeliveryTip) || 0;
                        const total = tip + totalMenuPrice;
                        return sum + item.total;
                    }, 0);
                    setTotalPrice(totalPrice);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("주문 정보 오류:", error);
                setError("주문 정보를 불러올 수 없습니다.");
            })
            .finally(() => setLoading(false));
    }, [orderNumber]);

    return (
        <div className="user-order-background">
            <div className="user-order-menu-container">
                <div className="user-title-center">주문 상세 내역</div>
                <div className="user-order-hr"></div>

                <div className="user-order-bordtext">{order?.storeName}</div>

                <div className="user-order-mt">
                    <div
                        className="user-order-basic-text-m-0">{order?.menuName} {order.quantity > 1 ? ` 외 ${order.quantity - 1}개` : '1개'}</div>

                    <div className="user-order-mt">
                        <div>
                            <span className="user-order-basic-text-m-0">주문일시 : </span> <span
                            className="user-select-mid-text">{order?.orderCreateDate
                            ? new Date(order.orderCreateDate).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                weekday: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })
                                .replace(/\. /g, '-')
                                .replace(/\./, '')
                                .replace(/-(?=\([가-힣]{1}\))/, ' ')
                            : '날짜 정보 없음'}</span>
                        </div>
                        <div>
                            <span className="user-order-basic-text-m-0">주문번호 : </span> <span
                            className="user-select-mid-text">{order.orderNumber}</span>
                        </div>
                    </div>
                </div>

                <div className="user-order-hr"></div>
                <div className="user-order-bordtext">상세 내역</div>


                <div className="user-order-mt">
                    {orderItems.length > 0 ? (
                        orderItems.map((item, index) => {
                            const isLastItem = index === orderItems.length - 1;
                            return (
                                <div key={index}>
                                    <div className="user-order-address-detail-text">{item.menuName}</div>
                                    {item.optionNames && (
                                        <div className="user-cart-detailtext">
                                            {item.optionNames} {item.optionContents}
                                            {item.optionPrices && ` (+${Number(item.optionPrices).toLocaleString()}원)`}
                                        </div>
                                    )}
                                    <div className="user-cart-detailtext">
                                        {Number(item.menuPrice + (item.totalOptionPrice || 0)).toLocaleString()}원
                                    </div>
                                    <div className="user-select-mid-text">{item.quantity}개</div>
                                    {!isLastItem && <div className="user-order-hr-mini"></div>}
                                </div>
                            );
                        })
                    ) : (
                        <div>주문 상세 내역이 없습니다.</div>
                    )}
                </div>
                <div className="user-order-hr"></div>

                <div className="user-order-price-grid">
                    <div className="user-order-bordtext">결제금액</div>
                    <div className="user-cart-big-pricetext">{totalPrice.toLocaleString()}원</div>
                </div>

                <div className="user-order-address-grid">
                    <div className="user-order-basic-text-m-0">주문금액</div>
                    <div className="user-select-mid-text">{totalMenuPrice.toLocaleString()}원</div>
                </div>

                <div className="user-order-address-grid">
                    <div className="user-order-basic-text-m-0">배달팁</div>
                    <div className="user-select-mid-text">{Number(order.storeDeliveryTip).toLocaleString()}원</div>
                </div>

                <div className="user-order-hr"></div>

                <div className="user-order-bordtext">배달 주소</div>
                <div className="user-order-mt">
                    <div
                        className="user-order-address-detail-text">{order.address} {order.detailedAddress}</div>
                    <div className="user-order-hr-mini"></div>
                </div>

                <div className="user-order-bordtext">요청사항</div>

                <div className="user-order-mt">
                    <div className="user-order-address-detail-text">{order.orderRequests}</div>
                </div>

                <div className="user-order-click-btn-one">
                    <button className="user-order-btn-b">주문내역 삭제</button>
                </div>
            </div>
        </div>
    );
};

export default UserOrderDetail;
