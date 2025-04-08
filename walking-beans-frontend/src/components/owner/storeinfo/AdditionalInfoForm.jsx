import MenuInputTag from "../MenuInputTag";
import {useEffect, useState} from "react";
import basicImg from "../../../assert/images/menu/default-menu-img.png"

// handleFileChange 파일 입력 핸들러
const AdditionalInfoForm = ({ formData, handleChange, handleFileChange ,isEditing }) => {
    const [thumbnail, setThumbnail] = useState(formData.storePictureUrl || null); // 썸네일 미리보기 URL

    // 기존이미지 설정
    useEffect(() => {
        if(isEditing && typeof formData.storePictureUrl === "string" ){
            setThumbnail(formData.storePictureUrl) // 기존 URL로 초기화
        } else {
            setThumbnail(null); // 디폴트 이미지
            console.log("formData.storePictureUrl",formData.storePictureUrl)
        }
    }, [isEditing, formData.storePictureUrl]);

    // 파일 변경 핸들러
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        console.log("파일 입력 변경: ", file ? file.name : "null");

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnail(reader.result); // 썸네일 Base 64 URL 설정
            };
            reader.readAsDataURL(file);

            handleFileChange(file); // 부모로 파일 전달
        } else {
            setThumbnail(formData.storePictureUrl || null); // 파일 없으면 디폴트 이미지로
            handleFileChange(null);
        }
    };

    return (
        <div className="form-section">
            <h2>추가 정보</h2>
            <div className="MenuInputTag-container">
                <label htmlFor="storePictureUrl">매장 로고 : </label>
                <div>
                    <img
                        style={{maxWidth: "300px", marginTop: "10px"}}
                        src={thumbnail || basicImg} // 썸네일 없으면 디폴트 이미지
                        alt="매장 로고 미리보기"
                    />
                </div>
                <input
                    type="file"
                    id="storePictureUrl"
                    name="storePictureUrl"
                    onChange={handleThumbnailChange}
                    disabled={!isEditing}
                />
            </div>
            <MenuInputTag
                id="storeReviewCount"
                label="리뷰 수"
                placeholder=""
                value={formData.storeReviewCount}
                onChange={handleChange}
                type="number"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeRating"
                label="평점"
                placeholder=""
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