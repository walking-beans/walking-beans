import MenuInputTag from "../MenuInputTag";


const DeliveryInfoForm = ({formData, handleChange}) => {


    return(
        <div className="form-section">
            <h2>배달 정보</h2>
            <MenuInputTag
                id="store_min_delivery_time"
                label="최소 배달 시간 (분)"
                placeholder="예: 30"
                value={formData.store_min_delivery_time}
                onChange={handleChange}
                type="number"
                required={false}
            />
            <MenuInputTag
                id="store_max_delivery_time"
                label="최대 배달 시간 (분)"
                placeholder="예: 60"
                value={formData.store_max_delivery_time}
                onChange={handleChange}
                type="number"
                required={false}
            />
            <MenuInputTag
                id="store_delivery_tip"
                label="배달 팁 (원)"
                placeholder="예: 3000"
                value={formData.store_delivery_tip}
                onChange={handleChange}
                type="number"
                required={true}
            />
            <MenuInputTag
                id="store_delivery_address"
                label="배달 주소"
                placeholder="배달 가능 지역을 입력하세요"
                value={formData.store_delivery_address}
                onChange={handleChange}
                type="text"
                required={false}
            />

        </div>
    )
}

export default DeliveryInfoForm;