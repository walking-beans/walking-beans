import MenuInputTag from "../MenuInputTag";


const OperationInfoForm = ({ formData, handleChange, isEditing }) => {
    return (
        <div className="form-section">
            <h2>운영 정보</h2>
            <MenuInputTag
                id="storeOperationHours"
                label="운영 시간"
                placeholder="예: 09:00 - 18:00"
                value={formData.storeOperationHours}
                onChange={handleChange}
                type="text"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeClosedDates"
                label="휴무일"
                placeholder="예: 매주 월요일"
                value={formData.storeClosedDates}
                onChange={handleChange}
                type="text"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeStatus"
                label="가게 상태"
                placeholder="운영 중 / 휴무"
                value={formData.storeStatus}
                onChange={handleChange}
                type="text"
                required={false}
                isEditing={isEditing}
            />
        </div>
    );
};

export default OperationInfoForm;