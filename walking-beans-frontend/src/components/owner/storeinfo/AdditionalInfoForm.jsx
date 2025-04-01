import MenuInputTag from "../MenuInputTag";

// handleFileChange 파일 입력 핸들러
const AdditionalInfoForm = ({ formData, handleChange, handleFileChange ,isEditing }) => {

    return (
        <div className="form-section">
            <h2>추가 정보</h2>
            <div className="MenuInputTag-container">
                <label htmlFor="storePictureUrl">매장 로고 : </label>
                <input
                    type="file"
                    id="storePictureUrl"
                    name="storePictureUrl"
                    onChange={(e)=> { // 이미지 파일 확인용
                        const file = e.target.files[0];
                        console.log("파일 입력 변경: ", file ? file.name : "null");
                        handleFileChange(file);
                    }}
                />
            </div>
            <MenuInputTag
                id="storeReviewCount"
                label="리뷰 수"
                placeholder="리뷰 수를 입력하세요"
                value={formData.storeReviewCount}
                onChange={handleChange}
                type="number"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeRating"
                label="평점"
                placeholder="예: 4.5"
                value={formData.storeRating}
                onChange={handleChange}
                type="number"
                required={true}
                isEditing={isEditing}
            />
        </div>
    );
};

export default AdditionalInfoForm;