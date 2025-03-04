import RiderHeader from "../layout/RiderHeader";
import {useEffect, useState} from "react";

const RiderOntheway = () => {

    useEffect(() => {
        // Kakao SDK 초기화 (한 번만 실행)
        if (!window.Kakao) return;
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init("1cfadb6831a47f77795a00c42017b581"); // 여기에 본인의 JavaScript 키 입력
        }
    }, []);

    const handleNavigation = () => {
        if (!window.Kakao) {
            alert("Kakao SDK가 로드되지 않았습니다.");
            return;
        }

        window.Kakao.Navi.start({
            name: "현대백화점 판교점",
            x: 127.11205203011632,
            y: 37.39279717586919,
            coordType: "wgs84",
        });
    };

    return (
        <div>
            <RiderHeader />
            <button
                onClick={handleNavigation}
                style={{
                    backgroundColor: "#FFEB00",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}>
                카카오내비
            </button>
        </div>
    );
}

export default RiderOntheway;