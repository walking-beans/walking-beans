import BasicInfoForm from "../../components/owner/storeinfo/BasicInfoForm.jsx";
import AdditionalInfoForm from "../../components/owner/storeinfo/AdditionalInfoForm";
import LocationInfoForm from "../../components/owner/storeinfo/LocationInfoForm";
import OperationInfoForm from '../../components/owner/storeinfo/OperationInfoForm';
import DeliveryInfoForm from '../../components/owner/storeinfo/DeliveryInfoForm';
import {useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const StoreRegister = () => {
    // 폼 초기상태 설정
    const {id}= useParams(); // 유저 아이디
    console.log("유저아이디 확인용: "+ id);
    const [formData, setFormData] = useState({
        user_id: {id},
        store_name: "",
        store_description: "",
        store_main_menu: "",
        store_business_number: "",
        store_phone: "",
        store_operation_hours: "",
        store_closed_dates: "",
        store_status: "운영 중", // 기본값
        store_review_count: 0,   // 기본값
        store_rating: 0.0,       // 기본값
        store_min_delivery_time: "",
        store_max_delivery_time: "",
        store_delivery_tip: "",
        store_delivery_address: "",
        store_address: "",
        store_latitude: "",
        store_longitude: "",
        store_picture_url: null, // 파일 초기화
    });

    // 텍스트 입력 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=>({...prev, [name]: value }));
    };

    // 파일 입력
    const handleFileChange = (file) => {
        setFormData((prev)=>({...prev, store_picture_url: file }));
    };

    // 폼 제출
    const handleSubmit = () => {
        const uploadData = new FormData();
        // 파일 추가
        if(formData.store_picture_url){
            uploadData.append("store_picture_url", formData.store_picture_url);
        }

        // 나머지 필드
        uploadData.append("user_id", formData.user_id);
        uploadData.append("store_name", formData.store_name);
        uploadData.append("store_description", formData.store_description);
        uploadData.append("store_main_menu", formData.store_main_menu);
        uploadData.append("store_business_number", formData.store_business_number);
        uploadData.append("store_phone", formData.store_phone);
        uploadData.append("store_operation_hours", formData.store_operation_hours);
        uploadData.append("store_closed_dates", formData.store_closed_dates);
        uploadData.append("store_status", formData.store_status);
        uploadData.append("store_review_count", formData.store_review_count);
        uploadData.append("store_rating", formData.store_rating);
        uploadData.append("store_min_delivery_time", formData.store_min_delivery_time);
        uploadData.append("store_max_delivery_time", formData.store_max_delivery_time);
        uploadData.append("store_delivery_tip", formData.store_delivery_tip);
        uploadData.append("store_delivery_address", formData.store_delivery_address);
        uploadData.append("store_address", formData.store_address);
        uploadData.append("store_latitude", formData.store_latitude);
        uploadData.append("store_longitude", formData.store_longitude);

        axios
            .post("http://localhost:7070/api/stores",
                uploadData,
                {headers: {"Content-Type": "multipart/form-data"},
                })
            .then((res)=>{
                console.log("가게등록성공");
            })
            .catch((err)=>{
                console.log("가게등록실패", err);
            })
    }

    // 에러 잡는용도
    console.log("StoreRegister formData:", formData);
    return(
        <div>
            <h2> 가게 신규 등록</h2>
            <AdditionalInfoForm formData={formData} handleChange={handleChange} handleFileChange={handleFileChange}/>
            <BasicInfoForm formData={formData} handleChange={handleChange}/>
            <OperationInfoForm formData={formData} handleChange={handleChange}/>
            <DeliveryInfoForm formData={formData} handleChange={handleChange}/>
            <LocationInfoForm formData={formData} handleChange={handleChange}/>

            {/*

            */}

            <button onClick={handleSubmit}>등록</button>
        </div>
    )
};

export default StoreRegister;