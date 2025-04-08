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
            {/*가게 상태 라디오버튼*/}
            <div className="mb-3">
                <label className="form-label d-block">가게 상태 :</label>
                <div style={{display: "flex", gap: "1rem"}}>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="storeStatus"
                            id="status-open"
                            value="운영 중"
                            checked={formData.storeStatus === "운영 중"}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                        <label className="form-check-label" htmlFor="status-open">
                            운영 중
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="storeStatus"
                            id="status-ready"
                            value="준비 중"
                            checked={formData.storeStatus === "준비 중"}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                        <label className="form-check-label" htmlFor="status-ready">
                            준비 중
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="storeStatus"
                            id="status-closed"
                            value="휴무"
                            checked={formData.storeStatus === "휴무"}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                        <label className="form-check-label" htmlFor="status-closed">
                            휴무
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperationInfoForm;