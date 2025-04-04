import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AdditionalInfoForm from "../../components/owner/storeinfo/AdditionalInfoForm";
import BasicInfoForm from "../../components/owner/storeinfo/BasicInfoForm";
import OperationInfoForm from "../../components/owner/storeinfo/OperationInfoForm";
import DeliveryInfoForm from "../../components/owner/storeinfo/DeliveryInfoForm";
import LocationInfoForm from "../../components/owner/storeinfo/LocationInfoForm";


const StoreMyStore = () => {
    const {id} = useParams(); // 가게 아이디
    console.log("가게아이디 확인용: "+ id);
    const [formData, setFormData] = useState(null); // 초기 null로 로딩 상태 관리
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부

    // 폼 초기상태 설정 유저정보를 보여줘야함.
    useEffect(() => {
        axios
            .get(`http://localhost:7070/api/store/${id}`)
            .then((res) => {
                setFormData(res.data); // 백엔드에서 받은 데이터로 초기화
                console.log("가게 정보 조회 성공:", res.data);
            })
            .catch((err) => {
                console.error("가게 정보 조회 실패:", err);
            });
    }, [id]);


    // 텍스트 입력 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=>({...prev, [name]: value }));
    };

    // 파일 입력
    const handleFileChange = (file) => {
        setFormData((prev)=>({...prev, store_picture_url: file }));
    };

    // 에러 잡는용도
    console.log("StoreRegister formData:", formData);

    // 수정모드 변환 토글
    const toggleEditMode = () => setIsEditing(!isEditing);

    // 수정점 저장 요청
    const handleSave = () => {
        const uploadData = new FormData();
        // ... (기존 로직)
        axios
            .put(`http://localhost:7070/api/stores/update/{id}`, uploadData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(() => setIsEditing(false))
            .catch((err)=>{
            console.log("수정점 전송 실패",err)
        });

    };

    if (!formData) return <div>로딩 중...</div>;

    return(
        <div>
            <h2> 가게 신규 등록</h2>
            <AdditionalInfoForm formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} isEditing={isEditing}/>
            <BasicInfoForm formData={formData} handleChange={handleChange} isEditing={isEditing}/>
            <OperationInfoForm formData={formData} handleChange={handleChange} isEditing={isEditing}/>
            <DeliveryInfoForm formData={formData} handleChange={handleChange} isEditing={isEditing}/>
            <LocationInfoForm formData={formData} handleChange={handleChange} isEditing={isEditing}/>

            {/*

            */}
            {isEditing ? (
                <>
                    <button onClick={handleSave}>저장</button>
                    <button onClick={toggleEditMode}>취소</button>
                </>
            ) : (
                <button onClick={toggleEditMode}>수정</button>
            )}
        </div>
    )
};
export default StoreMyStore;