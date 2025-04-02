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
        userId: id,
        storeName: "",
        storeDescription: "",
        storeMainMenu: 0,
        storeBusinessNumber: "",
        storePhone: "",
        storeOperationHours: "09:00 - 18:00",
        storeClosedDates: "",
        storeStatus: "운영 중", // 기본값
        storeReviewCount: 0,   // 기본값
        storeRating: 0.0,       // 기본값
        storeMinDeliveryTime: "",
        storeMaxDeliveryTime: "",
        storeDeliveryTip: "",
        storeDeliveryAddress: "",
        storeAddress: "",
        storeLatitude: "00.000001",
        storeLongitude: "00.000001",
        storePictureUrl: null, // 파일 초기화
    });


    // 텍스트 입력 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=>({...prev, [name]: value }));
    };

    // 파일 입력
    const handleFileChange = (file) => {
        console.log("파일 선택됨: ", file ? file.name : "null"); // 파일 이름 확인
        setFormData((prev)=>({...prev, storePictureUrl: file }));
    };

    // 폼 제출
    const handleSubmit = () => {
        const uploadData = new FormData();
        console.log("파일 상태: ", formData.storePictureUrl ? formData.storePictureUrl.name : "null");
        // 파일 추가
        if(formData.storePictureUrl){
            uploadData.append("storePictureUrl", formData.storePictureUrl);
            console.log("FormData에 추가된 파일: ", formData.storePictureUrl.name);
        } else {
            console.log("파일 없음: storePictureUrl이 null입니다");
        }
        // 이미지 제외 나머지 필드
        uploadData.append("userId", formData.userId);
        uploadData.append("storeName", formData.storeName);
        uploadData.append("storeDescription", formData.storeDescription);
        uploadData.append("storeMainMenu", formData.storeMainMenu);
        uploadData.append("storeBusinessNumber", formData.storeBusinessNumber);
        uploadData.append("storePhone", formData.storePhone);
        uploadData.append("storeOperationHours", formData.storeOperationHours);
        uploadData.append("storeClosedDates", formData.storeClosedDates);
        uploadData.append("storeStatus", formData.storeStatus);
        uploadData.append("storeReviewCount", formData.storeReviewCount);
        uploadData.append("storeRating", formData.storeRating);
        uploadData.append("storeMinDeliveryTime", formData.storeMinDeliveryTime);
        uploadData.append("storeMaxDeliveryTime", formData.storeMaxDeliveryTime);
        uploadData.append("storeDeliveryTip", formData.storeDeliveryTip);
        uploadData.append("storeDeliveryAddress", formData.storeDeliveryAddress);
        uploadData.append("storeAddress", formData.storeAddress);
        uploadData.append("storeLatitude", formData.storeLatitude);
        uploadData.append("storeLongitude", formData.storeLongitude);

        axios
            .post("http://localhost:7070/api/store",
                uploadData,
                {headers: {"Content-Type": "multipart/form-data"},
                })
            .then((res)=>{
                console.log("가게등록성공", res.data);
            })
            .catch((err)=>{
                console.log("가게등록실패", err.response ? err.response.data : err.message);
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