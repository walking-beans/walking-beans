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

    useEffect(() => {
        axios.get(`http://localhost:7070/api/orders/detail/orderNumber/${orderNumber}`)
            .then((response) => {
                setOrder(response.data[0] || {});
                console.log("주문 데이터 : ", response.data[0]);

                // 메뉴 가격 총합 계산
                const menuTotal = response.data.reduce((sum, item) => {
                    const itemPrice = (item.menuPrice + (item.totalOptionPrice || 0)) * item.quantity;
                    return sum + itemPrice;
                }, 0);

                setTotalMenuPrice(menuTotal);
                setLoading(false);
            })
            .catch((error) => {
                console.error("주문 정보를 불러오는 중 오류 발생:", error);
                setError("주문 정보를 가져올 수 없습니다.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [orderNumber]);

    const orderItems = order.orderList
        ? order.orderList.split("|").map(item => {
            const parts = item.trim().split("/");
            return {
                menuName: parts[0] || "메뉴 없음",
                optionName: parts[1] || "옵션 없음",
                optionContent: parts[2] || "옵션 내용 없음",
                menuPrice: parts[3] ? Number(parts[3]).toLocaleString() + "원" : "가격 정보 없음"
            };
        })
        : [];

    return (
        <div className="user-order-background">
            <div className="user-order-menu-container">
                <div className="user-title-center">주문 상세 내역</div>
                <div className="user-order-hr"></div>

                <div className="user-order-bordtext">{order?.storeName}</div>

                <div className="user-order-mt">
                    <div
                        className="user-order-basic-text-m-0">{order?.menuName} {order.quantity > 1 ? ` 외 ${order.quantity - 1}개` : '1개'}</div>
                    <div className="user-order-basic-text-m-0">주문일시 : {order?.orderCreateDate
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
                        : '날짜 정보 없음'}</div>

                    <div className="user-order-basic-text-m-0">주문번호 : {order.orderNumber}</div>
                </div>

                <div className="user-order-hr"></div>
                <div className="user-order-bordtext">상세 내역</div>


                <div className="user-order-mt">
                    {orderItems.map((item, index) => {
                        const isLastItem = index === orderItems.length - 1;
                        return (
                            <div key={index}>
                                <div className="user-order-address-detail-text">{item.menuName}</div>
                                {(item.optionName !== "옵션 없음" || item.optionContent !== "옵션 내용 없음") && (
                                    <div className="user-cart-detailtext">
                                        {item.optionName !== "옵션 없음" ? item.optionName : ''}
                                        {item.optionContent !== "옵션 내용 없음" ? ` ${item.optionContent}` : ''}
                                    </div>
                                )}
                                <div className="user-cart-detailtext">{item.menuPrice}</div>
                                <div className="user-select-mid-text">{order.quantity}개</div>
                                {!isLastItem && <div className="user-order-hr-mini"></div>}
                            </div>
                        );
                    })}
                </div>
                <div className="user-order-hr"></div>

                <div className="user-order-price-grid">
                    <div className="user-order-bordtext">결제금액</div>
                    <div className="user-cart-big-pricetext">{Number(order?.orderTotalPrice).toLocaleString()}원</div>
                </div>

                <div>주문금액</div>
                <div>{order.menuTotal}</div>

                <div>배달팁</div>
                <div>{order.storeDeliveryTip}</div>


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
