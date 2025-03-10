import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="footer-container">
                <div className="footer-company">
                    <strong>(주)Beans</strong><br />
                    대표이사 : 빈즈 | 사업자등록번호 123-45-67891<br />
                    주소 : 서울 강남구 테헤란로14길 6 남도빌딩 5층<br />
                    호스팅사업자 : 빈즈<br />
                    통신판매업신고번호 : 2025-서울강남-1234
                </div>

                <div className="footer-customer">
                    <strong>고객센터 1525-2525</strong><br />
                    영업시간 AM 10:00 ~ PM 17:00 (주말 및 공휴일 휴무)<br />
                    고객문의 : beans_cs@gmail.com
                </div>
            </div>
        </footer>
    );
};

export default Footer;
