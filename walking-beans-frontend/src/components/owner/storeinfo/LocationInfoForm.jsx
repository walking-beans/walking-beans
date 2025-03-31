import MenuInputTag from "../MenuInputTag";

const LocationInfoForm = ({formData, handleChange}) => {


    return(
        <div className="form-section">
            <h2>위치 정보</h2>
            <MenuInputTag
                id="store_address"
                label="가게 주소"
                placeholder="가게 주소를 입력하세요"
                value={formData.store_address}
                onChange={handleChange}
                type="text"
                required={true}
            />
            <MenuInputTag
                id="store_latitude"
                label="위도"
                placeholder="예: 37.123456"
                value={formData.store_latitude}
                onChange={handleChange}
                type="number"
                required={true}
            />
            <MenuInputTag
                id="store_longitude"
                label="경도"
                placeholder="예: 126.123456"
                value={formData.store_longitude}
                onChange={handleChange}
                type="number"
                required={true}
            />
        </div>
    )
}

export default LocationInfoForm;