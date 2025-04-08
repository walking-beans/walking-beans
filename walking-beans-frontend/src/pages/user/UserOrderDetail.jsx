import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const UserOrderDetail = () => {
    const {orderNumber} = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalMenuPrice, setTotalMenuPrice] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:7070/api/orders/detail/orderNumber/${orderNumber}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    // 주문 기본 정보는 첫 번째 항목에서 가져옴
                    const baseOrderInfo = response.data[0];
                    setOrder(baseOrderInfo);
                    setOrderItems(response.data);

                    for (const item of response.data) {
                        // 옵션 정보 문자열을 배열로 변환 (빈 문자열 처리 개선)
                        const names = item.optionNames && item.optionNames.trim() !== '' ?
                            item.optionNames.split(',') : [];

                        const contents = item.optionContents && item.optionContents.trim() !== '' ?
                            item.optionContents.split(',') : [];

                        const prices = item.optionPrices && item.optionPrices.trim() !== '' ?
                            item.optionPrices.split(',').map(price => {
                                const num = Number(price);
                                return isNaN(num) ? 0 : num;  // NaN 값도 처리
                            }) : [];

                        // 옵션 데이터가 모두 비어있으면 배열도 비워주기
                        if (names.length === 1 && names[0] === '' &&
                            contents.length === 1 && contents[0] === '' &&
                            prices.length === 1 && prices[0] === 0) {
                            item.optionNameArray = [];
                            item.optionContentArray = [];
                            item.optionPriceArray = [];
                        } else {
                            item.optionNameArray = names;
                            item.optionContentArray = contents;
                            item.optionPriceArray = prices;
                        }

                        // 디버깅 출력 추가
                        console.log(`주문 항목 ${item.order_item_id}의 옵션:`, {
                            names: item.optionNameArray,
                            contents: item.optionContentArray,
                            prices: item.optionPriceArray
                        });
                    }

                    // 메뉴 총액 계산
                    const menuTotal = response.data.reduce((sum, item) => {
                        const basePrice = parseInt(item.menuPrice) || 0;

                        // 옵션 가격 계산
                        const optionPrices = item.optionPrices
                            ? item.optionPrices.split(',').reduce((total, price) => total + parseInt(price), 0)
                            : 0;

                        const qty = parseInt(item.quantity) || 1;

                        // 옵션 정보 표시 로직 추가
                        const optionDisplay = item.optionNames && item.optionContents
                            ? item.optionNames.split(',').map((name, index) =>
                                `${name} ${item.optionContents.split(',')[index]} ${item.optionPrices.split(',')[index] !== '0' ? `(+${item.optionPrices.split(',')[index]}원)` : ''}`
                            ).join(', ')
                            : '';

                        const itemTotal = (basePrice + optionPrices) * qty;

                        console.log(`
                            메뉴: ${item.menuName}, 
                            기본가격: ${basePrice}, 
                            옵션: ${optionDisplay}, 
                            옵션가격: ${optionPrices}, 
                            수량: ${qty}, 
                            항목 총액: ${itemTotal}
                        `);
                        return sum + itemTotal;
                    }, 0);
                    setTotalMenuPrice(menuTotal);

                    console.log('총 메뉴 금액:', menuTotal);

                    // 배달팁 계산
                    const deliveryTip = parseInt(baseOrderInfo.storeDeliveryTip) || 0;
                    const totalPrice = menuTotal + deliveryTip;
                    setTotalPrice(totalPrice);

                    console.log('배달팁:', deliveryTip);
                    console.log('총 결제 금액:', totalPrice);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("주문 정보 오류:", error);
                setError("주문 정보를 불러올 수 없습니다.");
            })
            .finally(() => setLoading(false));
    }, [orderNumber]);

    // 주문 삭제 (상태 6일 때만 삭제가능)
    const handleDeleteOrder = () => {
        console.log("현재 주문 상태:", order.orderStatus);  // 상태 확인용 로그

        // 삭제 조건 확인
        if (order.orderStatus !== 6) {
            alert(`배달 완료된 주문만 삭제할 수 있습니다. (현재 상태: ${order.orderStatus})`);
            return;
        }

        // 사용자에게 삭제 확인 요청
        const confirmDelete = window.confirm(`주문번호 ${order.orderNumber}를 삭제하시겠습니까?\n삭제 후 복구는 불가능 합니다.`);

        if (confirmDelete) {
            axios.delete(`http://localhost:7070/api/orders/delete/${order.orderId}`)
                .then(() => {
                    // 성공 메시지 표시
                    alert("주문 내역이 성공적으로 삭제되었습니다.");
                    // 주문 목록 페이지로 리다이렉트
                    navigate("/order");
                })
                .catch((error) => {
                    console.error("주문 삭제 오류:", error.response ? error.response.data : error);
                    alert(
                        error.response?.data ||
                        "주문 내역 삭제 중 오류가 발생했습니다. 다시 시도해주세요."
                    );
                });
        }
    };

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
                            className="user-select-qyt-text">{order?.orderCreateDate
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
                            // 마지막 선 없애기
                            const isLastItem = index === orderItems.length - 1;
                            return (
                                <div key={index}>
                                    <div className="user-order-detail-grid">
                                        <div className="user-order-left">
                                            <div className="user-order-address-detail-text">{item.menuName}</div>
                                            {item.optionNameArray && item.optionNameArray.length > 0 && (
                                                <div className="user-cart-detailtext">
                                                    {item.optionNameArray.map((name, i) => (
                                                        <span key={i}>
                                                             {i > 0 ? ', ' : ''}
                                                            {name} {item.optionContentArray[i]}
                                                            ({item.optionPriceArray[i] > 0 ? `+${item.optionPriceArray[i].toLocaleString()}원` : '+0원'})
                                                         </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="user-cart-detailtext">
                                                {Number(item.menuPrice + (item.totalOptionPrice || 0)).toLocaleString()}원
                                            </div>
                                        </div>
                                        <div className="user-select-mid-text">{item.quantity}개</div>
                                    </div>
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
                    {order.orderStatus === 6 ? (
                        <button
                            className="user-order-btn-b"
                            onClick={handleDeleteOrder}
                        >
                            주문내역 삭제
                        </button>
                    ) : (
                        <div className="user-order-guide">
                            배달 완료 후 주문 내역을 삭제할 수 있습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserOrderDetail;
