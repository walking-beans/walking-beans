import React from "react";
import detailBtn from "../../images/user/detailbtn.svg";
import {Link} from "react-router-dom";

const UserOrderListForm = ({orderStatus, storePictureUrl, storeName, orderModifiedDate, menuName, totalQuantity, orderId}) => {

    const getOrderStatusText = (status) => {
        switch (status) {
            case 3: return "조리 중";
            case 4: return "조리 완료";
            case 5: return "배달 중";
            case 6: return "배달 완료";
            default: return "";
        }
    };

    // 상태가 수락 전(3)이면 렌더링하지 않음
    if (orderStatus < 3) return null;

    return (
        <div className="user-order-list-form-container">
            <div>{getOrderStatusText(orderStatus)}</div>
            <div>{storePictureUrl}</div>
            <div>{storeName}</div>
            <div>{orderModifiedDate}</div>
            <div>{menuName} 외 {totalQuantity}개</div>

            {orderStatus === 6 ? (
                <Link to={`/user/reviewWrite`}>
                    <img src={detailBtn} alt="리뷰쓰기 이동 버튼"/>
                </Link>
            ):(
                <Link to={`/user/orderlist/${orderId}`}>
                    <img src={detailBtn} alt="주문상세페이지 이동 버튼"/>
                </Link>
            )}


            <Link to={`/user/delivery/status/${orderId}`}>
                <button>배달현황 보기</button>
            </Link>
            <button>채팅 문의</button>
        </div>
    )
};

export default UserOrderListForm;