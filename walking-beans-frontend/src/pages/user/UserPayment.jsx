import "../../css/Order.css"
import React, {useState} from "react";
import tossPayLogo from "../../images/user/tossPay_Logo.svg";
import detailBtn from "../../images/user/detailbtn.svg";
import {Link} from "react-router-dom";
import checkBtnW from "../../images/user/checkBtnW.svg";
import checkBtnB from "../../images/user/checkBtnB.svg";


const UserPayment = () => {
    const [isClicked, setIsClicked] = useState(false);


    const handleClick = () => {
        setIsClicked(!isClicked);
    };

// 이미지 경로 설정
    const currentImage = isClicked ? checkBtnB : checkBtnW;

            return (

                <div className="user-order-background">
                    <div className="user-order-menu-container">
                        <div className="user-title-center">결제방법</div>
                        <div className="user-order-hr" alt="구분선"></div>
                        <div className="user-order-click-btn">
                            <button className="user-payment-mini-btn"><img src={tossPayLogo}/></button>
                            <button className="user-payment-mini-btn">만나서 결제</button>
                        </div>
                        <div className="user-order-basic-text">
                            <img src={currentImage}
                                 className="user-order-clickbtn"
                                 onClick={handleClick}
                                 alt="필수동의 체크 버튼"/>
                            [필수] 결제 서비스 이용 약관, 개인정보 처리
                            <Link to={`/user/order`}><img src={detailBtn}
                                                          alt="약관동의 페이지 만들기"/></Link>
                        </div>
                    </div>
                </div>

            )
            };

            export default UserPayment;