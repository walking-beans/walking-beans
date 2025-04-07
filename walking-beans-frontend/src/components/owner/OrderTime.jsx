import { useState, useEffect } from "react";


// 단순 현재시간에서 원하는 분 만큼 더한 시간이 표시되는 기능
const OrderTime = ({ minutesToAdd = 0 }) => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutesToAdd);

        const formattedTime = now.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        setTime(formattedTime);
    }, [minutesToAdd]);

    return <span>{time}</span>;
};

export default OrderTime;
