import tossPayLogo from "../../images/user/tossPay_Logo.svg";
import {Link} from "react-router-dom";
import detailBtn from "../../images/user/detailbtn.svg";
import React from "react";

const UserOrdering = () => {
    return (
        <div className="user-ordering-container">
            <div className="user-ordering">
                <div className="user-order-menu-container">
                    <div className="user-title-center">주문하기</div>
                    <div className="user-order-hr" alt="구분선"></div>

                    <div>
                        <div alt="그리드 추가">
                            <div className="user-cart-bordtext">배달주소</div>
                            <div className="user-order-address-text">배달상세주소</div>
                        </div>
                        <div>
                            <Link to={`/user/order`}><img src={detailBtn}
                                                          alt="배달 주소 리스트"/></Link>
                        </div>
                    </div>

                    <div className="user-order-hr" alt="구분선"></div>

                    <div className="user-cart-bordtext">요청사항</div>

                    <div className="user-order-hr" alt="구분선"></div>

                    <div className="user-cart-bordtext">주문매장명</div>
                    <div className="user-order-basic-text">메뉴명</div>
                    <div className="store-menu-price">메뉴옵션</div>
                    <div className="user-order-basic-text-m-0">가격 원</div>

                    <div className="user-order-hr" alt="구분선"></div>


                    <div className="user-order-click-btn">
                        <button className="user-order-btn-b">배달 주문하기</button>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default UserOrdering;