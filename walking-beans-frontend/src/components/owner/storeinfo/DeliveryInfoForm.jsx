import MenuInputTag from "../MenuInputTag";


const DeliveryInfoForm = ({formData, handleChange, isEditing}) => {


    return(
        <div className="form-section">
            <h2>배달 정보</h2>
            <MenuInputTag
                id="storeMinDeliveryTime"
                label="최소 배달 시간 (분)"
                placeholder="예: 30"
                value={formData.storeMinDeliveryTime}
                onChange={handleChange}
                type="number"
                required={false}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeMaxDeliveryTime"
                label="최대 배달 시간 (분)"
                placeholder="예: 60"
                value={formData.storeMaxDeliveryTime}
                onChange={handleChange}
                type="number"
                required={false}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeDeliveryTip"
                label="배달 팁 (원)"
                placeholder="예: 3000"
                value={formData.storeDeliveryTip}
                onChange={handleChange}
                type="number"
                required={true}
                isEditing={isEditing}
            />
            <MenuInputTag
                id="storeDeliveryAddress"
                label="배달 가능 구역"
                placeholder="배달 가능 지역을 입력하세요"
                value={formData.storeDeliveryAddress}
                onChange={handleChange}
                type="text"
                required={false}
                isEditing={isEditing}
            />

        </div>
    )
}

export default DeliveryInfoForm;