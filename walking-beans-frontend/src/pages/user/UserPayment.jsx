import "../../css/Order.css"
import React, {useState} from "react";
import tossPayLogo from "../../images/user/tossPay_Logo.svg";
import detailBtn from "../../images/user/detailbtn.svg";
import {Link, useNavigate, useParams} from "react-router-dom";
import checkBtnW from "../../images/user/checkBtnW.svg";
import checkBtnB from "../../images/user/checkBtnB.svg";

const UserPayment = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [clicked, setClicked] = useState(null);
    const navigate = useNavigate();
    const {orderId} = useParams();

    // 결제 방법 선택
    const handlePayMethodClick = (method) => {
        setClicked(method);
        localStorage.setItem("paymentMethod", method); // 선택된 결제 방식을 로컬스토리지에 저장
    };

    // 필수 약관 동의 클릭
    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    // 필수 약관 동의 이미지 경로 설정
    const currentImage = isClicked ? checkBtnB : checkBtnW;

    // 결제하기 버튼 클릭
    const handlePaymentClick = () => {
        if (clicked === 'tossPay') {
            console.log('결제 수단 : tossPay');
            navigate(`/user/delivery/status/${orderId}`); // 배달 현황 페이지로 이동
        } else if (clicked === 'meetPayment') {
            console.log('결제 수단 : 만나서 결제');
            navigate(`/user/delivery/status/${orderId}`); // 배달 현황 페이지로 이동
        } else {
            // 결제 방법이 선택되지 않은 경우
            alert('결제 방법을 선택해주세요.');
        }
    };

    return (

        <div className="user-order-background">
            <div className="user-order-menu-container">
                <div className="user-title-center">결제방법</div>
                <div className="user-order-hr" alt="구분선"></div>
                <div className="user-order-click-btn">

                    {/* tossPay */}
                    <button className={`user-payment-mini-btn ${clicked === 'tossPay' ? 'selected' : ''}`}
                            onClick={() => handlePayMethodClick('tossPay')}>
                        <input
                            type="radio"
                            className="user-order-btn-none"
                            checked={clicked === 'tossPay'}
                        />
                        <img src={tossPayLogo} alt="tossPay logo"/>
                    </button>

                    {/* 만나서 결제 */}
                    <button className={`user-payment-mini-btn ${clicked === 'meetPayment' ? 'selected' : ''}`}
                            onClick={() => handlePayMethodClick('meetPayment')}>
                        <input
                            type="radio"
                            className="user-order-btn-none"
                            checked={clicked === 'meetPayment'}
                            readOnly
                        />
                        만나서 결제
                    </button>
                </div>

                {/* 필수 동의 */}
                <div className="user-order-basic-text">
                    <img src={currentImage}
                         className="user-order-clickbtn"
                         onClick={handleClick}
                         alt="필수동의 체크 버튼"/>
                    [필수] 결제 서비스 이용 약관, 개인정보 처리
                    <Link to={`/user/order`}>
                        <img src={detailBtn} alt="약관동의 페이지 만들기"/>
                    </Link>
                </div>


                {/* 결제하기 */}
                <div className="user-order-click-btn-one">
                    <button className="user-order-btn-b"
                    onClick={handlePaymentClick}>결제하기</button>
                </div>
            </div>
        </div>

    )
};

export default UserPayment;