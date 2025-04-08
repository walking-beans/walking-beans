import { useEffect } from "react";

// 기본 5초. 필요시 부모에서 관리
const MsgToast = ({ message, duration = 5000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if(!message) return null;

    return (
        <>
        {/*임시 스타일*/}
        <div style={{
            position: "fixed",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)", // X축 기준 중앙 정렬
            backgroundColor: "#333",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 1001,
            whiteSpace: "nowrap", // 줄 바꿈 방지
            display: "inline-block" // 내용이 한 줄로 표시되도록 설정
        }}>
            {message}
        </div>
        </>
    );
};

export default MsgToast;