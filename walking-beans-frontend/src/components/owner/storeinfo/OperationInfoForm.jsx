import MenuInputTag from "../MenuInputTag";


const OperationInfoForm = ({ formData, handleChange }) => {
    return (
        <div className="form-section">
            <h2>운영 정보</h2>
            <MenuInputTag
                id="store_operation_hours"
                label="운영 시간"
                placeholder="예: 09:00 - 18:00"
                value={formData.store_operation_hours}
                onChange={handleChange}
                type="text"
                required={true}
            />
            <MenuInputTag
                id="store_closed_dates"
                label="휴무일"
                placeholder="예: 매주 월요일"
                value={formData.store_closed_dates}
                onChange={handleChange}
                type="text"
                required={true}
            />
            <MenuInputTag
                id="store_status"
                label="가게 상태"
                placeholder="운영 중 / 휴무"
                value={formData.store_status}
                onChange={handleChange}
                type="text"
                required={false}
            />
        </div>
    );
};

export default OperationInfoForm;