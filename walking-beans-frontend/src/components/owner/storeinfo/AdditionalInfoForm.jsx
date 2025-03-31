import MenuInputTag from "../MenuInputTag";

// handleFileChange 파일 입력 핸들러
const AdditionalInfoForm = ({ formData, handleChange, handleFileChange }) => {

    return (
        <div className="form-section">
            <h2>추가 정보</h2>
            <div className="MenuInputTag-container">
                <label htmlFor="store_picture_url">매장 로고 : </label>
                <input
                    type="file"
                    id="store_picture_url"
                    name="store_picture_url"
                    onChange={(e)=> handleFileChange(e.target.files[0])}
                />
            </div>
            <MenuInputTag
                id="store_review_count"
                label="리뷰 수"
                placeholder="리뷰 수를 입력하세요"
                value={formData.store_review_count}
                onChange={handleChange}
                type="number"
                required={true}
            />
            <MenuInputTag
                id="store_rating"
                label="평점"
                placeholder="예: 4.5"
                value={formData.store_rating}
                onChange={handleChange}
                type="number"
                required={true}
            />
        </div>
    );
};

export default AdditionalInfoForm;