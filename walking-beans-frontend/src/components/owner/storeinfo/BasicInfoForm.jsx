import MenuInputTag from "../MenuInputTag";

const BasicInfoForm = ({ formData, handleChange }) => {
    return (
        <div className="form-section">
            <h2>기본 정보</h2>
            <MenuInputTag
                id="store_name"
                label="가게 이름"
                placeholder="가게 이름을 입력하세요"
                value={formData.store_name}
                onChange={handleChange}
                type="text"
                required={true}
            />
            <MenuInputTag
                id="store_description"
                label="가게 설명"
                placeholder="가게 설명을 입력하세요"
                value={formData.store_description}
                onChange={handleChange}
                type="text"
                required={false}
            />
            <MenuInputTag
                id="store_main_menu"
                label="메인 메뉴 ID"
                placeholder="메인 메뉴 ID를 입력하세요"
                value={formData.store_main_menu}
                onChange={handleChange}
                type="number"
                required={true}
            />
            <MenuInputTag
                id="store_business_number"
                label="사업자 번호"
                placeholder="사업자 번호를 입력하세요"
                value={formData.store_business_number}
                onChange={handleChange}
                type="number"
                required={true}
            />
            <MenuInputTag
                id="store_phone"
                label="전화번호"
                placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                value={formData.store_phone}
                onChange={handleChange}
                type="text"
                required={true}
            />
        </div>
    );
};

export default BasicInfoForm;