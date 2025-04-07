import MenuInputTag from "../MenuInputTag";

const LocationInfoForm = ({formData, handleChange, isEditing}) => {


    return(
        <div className="form-section">
            <h2>위치 정보</h2>
            <MenuInputTag
                id="storeAddress"
                label="가게 주소"
                placeholder="가게 주소를 입력하세요"
                value={formData.storeAddress}
                onChange={handleChange}
                type="text"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeLatitude"
                label="위도"
                placeholder="예: 37.123456"
                value={formData.storeLatitude}
                onChange={handleChange}
                type="number"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeLongitude"
                label="경도"
                placeholder="예: 126.123456"
                value={formData.storeLongitude}
                onChange={handleChange}
                type="number"
                required={true}
                isEditing={isEditing}
            />
        </div>
    )
}

export default LocationInfoForm;