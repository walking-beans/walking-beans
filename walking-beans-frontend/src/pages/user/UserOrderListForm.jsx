import React from "react";
import detailBtn from "../../images/user/detailbtn.svg";
import {Link} from "react-router-dom";

const UserOrderListForm = ({orderStatus, storePictureUrl, storeName, orderModifiedDate, menuName, cartQuantity, orderId}) => {

    return (
        <div className="user-order-list-form-container">
            <div>{orderStatus}</div>
            <div>{storePictureUrl}</div>
            <div>{storeName}</div>
            <div>{orderModifiedDate}</div>
            <div>{menuName} 외 {cartQuantity}개</div>
            <Link to={`/user/orderlist/${orderId}`}>
                <img src={detailBtn} alt="주문상세페이지 이동 버튼"/>
            </Link>

            <Link to={`/user/delivery/${orderId}`}>
            <button>배달현황 보기</button>
            </Link>
            <button>채팅 문의</button>
        </div>
    )
};

export default UserOrderListForm;