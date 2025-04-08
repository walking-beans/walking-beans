const StoreDeliveryTimeSetter = ({ storeMinDeliveryTime, onUpdate }) => {
    const [deliveryTime, setDeliveryTime] = useState(storeMinDeliveryTime);

    const handleChange = (e) => {
        const value = Math.min(60, Math.max(5, Number(e.target.value))); // 5~60분 제한
        setDeliveryTime(value);
        onUpdate(value); // 변경된 값 부모 컴포넌트에 전달
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span>배달 예상 시간:</span>
            <input type="range" min="5" max="60" step="1" value={deliveryTime} onChange={handleChange} style={{ flex: 1 }} />
            <input type="number" value={deliveryTime} onChange={handleChange} min="5" max="60" style={{ width: "50px", textAlign: "center" }} />
            <span>분</span>
        </div>
    );
};

export default StoreDeliveryTimeSetter;