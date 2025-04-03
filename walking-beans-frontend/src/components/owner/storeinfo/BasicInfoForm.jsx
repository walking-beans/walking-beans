import MenuInputTag from "../MenuInputTag";

const BasicInfoForm = ({ formData, handleChange, isEditing }) => {
    return (
        <div className="form-section">
            <h2>기본 정보</h2>
            <MenuInputTag
                id="storeName"
                label="가게 이름"
                placeholder="가게 이름을 입력하세요"
                value={formData.storeName}
                onChange={handleChange}
                type="text"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeDescription"
                label="가게 설명"
                placeholder="가게 설명을 입력하세요"
                value={formData.storeDescription}
                onChange={handleChange}
                type="text"
                required={false}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeMainMenu"
                label="메인 메뉴"
                placeholder="메인 메뉴 ID를 입력하세요"
                value={formData.storeMainMenu}
                onChange={handleChange}
                type="number"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeBusinessNumber"
                label="사업자 번호"
                placeholder="사업자 번호를 입력하세요"
                value={formData.storeBusinessNumber}
                onChange={handleChange}
                type="number"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storePhone"
                label="전화번호"
                placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                value={formData.storePhone}
                onChange={handleChange}
                type="text"
                required={true}
                isEditing={isEditing}
            />
        </div>
    );
};

export default BasicInfoForm;