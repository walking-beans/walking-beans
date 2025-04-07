import { useEffect } from "react";

const MsgToast = ({ message, duration = 5000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <>
        {/*임시 스타일*/}
        <div style={{
            position: "absolute",
            bottom: "20px",
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