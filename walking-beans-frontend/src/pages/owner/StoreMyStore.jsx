import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import BasicInfoForm from "../../components/owner/storeinfo/BasicInfoForm";
import OperationInfoForm from "../../components/owner/storeinfo/OperationInfoForm";
import DeliveryInfoForm from "../../components/owner/storeinfo/DeliveryInfoForm";
import LocationInfoForm from "../../components/owner/storeinfo/LocationInfoForm";
import MenuInputTag from "../../components/owner/MenuInputTag";


const StoreMyStore = () => {
    const {id} = useParams(); // 가게 아이디
    console.log("가게아이디 확인용: "+ id);
    const [formData, setFormData] = useState(null); // 초기 null로 로딩 상태 관리
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
    const imgRef = useRef();
    const [imgFile, setImgFile] = useState("");
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

    // 썸네일 보여주기 (미리보기용)
    const setThumbnail = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // 파일을URL로 만들기
            reader.onloadend = () => {
                setImgFile(reader.result);
            };
        }
    };

    // 파일 입력
    /*
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("파일 입력 변경: ", file ? file.name : "null"); // 디버깅용

        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnail(reader.result); // 썸네일 미리보기용 url String
            };
            reader.readAsDataURL(file);
            setFormData((prev)=>({
                ...prev,
                storePictureUrl: file, // File 을 객체로 저장
            }));
        } else {
            setThumbnail(formData.storePictureUrl || basicImg);
            setFormData((prev) => ({
                ...prev,
                storePictureUrl: formData.storePictureUrl || null,
            }));
        }
    };
    */

    // 에러 잡는용도
    console.log("StoreRegister formData:", formData);

    // 수정모드 변환 토글
    const toggleEditMode = () => setIsEditing(!isEditing);

    // 수정점 저장 요청
    const handleSave = (e) => {
        e.preventDefault()
        const uploadData = new FormData();
        // Store 데이터 추가
        uploadData.append("storeId", id);
        uploadData.append("userId", formData.userId);
        uploadData.append("storeName", formData.storeName);
        uploadData.append("storeDescription", formData.storeDescription);
        uploadData.append("storeMainMenu", formData.storeMainMenu);
        uploadData.append("storeBusinessNumber", formData.storeBusinessNumber);
        uploadData.append("storePhone", formData.storePhone);
        uploadData.append("storeOperationHours", formData.storeOperationHours);
        uploadData.append("storeClosedDates", formData.storeClosedDates);
        //uploadData.append("storeReviewCount", formData.storeReviewCount);
        //uploadData.append("storeRating", formData.storeRating);
        uploadData.append("storeStatus", formData.storeStatus)
        uploadData.append("storeMinDeliveryTime", formData.storeMinDeliveryTime);
        uploadData.append("storeMaxDeliveryTime", formData.storeMaxDeliveryTime);
        uploadData.append("storeDeliveryTip", formData.storeDeliveryTip);
        uploadData.append("storeDeliveryAddress", formData.storeDeliveryAddress);
        uploadData.append("storeAddress", formData.storeAddress);
        uploadData.append("storeLatitude", formData.storeLatitude);
        uploadData.append("storeLongitude", formData.storeLongitude);
        if (imgRef.current?.files[0]) {
            uploadData.append("storePictureUrl", imgRef.current.files[0]);
            console.log("프론트 - 파일 추가: " + imgRef.current.files[0]);
        } else {
            console.log("프론트 - 파일 없음: " + imgRef.current.files[0]);
        }

        axios
            .patch(`http://localhost:7070/api/store/update/${id}`, uploadData,
                {headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
        })
            .then((response) => {setIsEditing(false);
                console.log("요청 성공:", response.data);
                alert("수정된 정보 저장 완료!")
            })
            .catch((err)=>{
            console.log("수정점 전송 실패",err.response ? err.response.data : err.message)
        });

    };

    if (!formData) return <div>로딩 중...</div>;

    return(
        <form>
            <h2>내 가게 정보보기</h2>
            {/*조작 버튼들*/}
            {isEditing ? (
                <>
                    <button className={"col-2 offset-8"} onClick={handleSave}>저장</button>
                    <button className={"col-2"} onClick={toggleEditMode}>취소</button>
                </>
            ) : (
                <button className={"col-2 offset-10"} onClick={toggleEditMode}>수정</button>
            )}
            {/*인풋창들*/}
            <div>
                <img style={{maxWidth: '300px', marginTop: '10px'}}
                     src={imgFile ? imgFile : formData.storePictureUrl}
                     alt={"메뉴 이미지"}
                />
                <label htmlFor={"storePictureUrl"} className={"form-label"}></label>
                <input className={"form-control form-control-lg"}
                       id={"storePictureUrl"}
                       type={"file"}
                       name={"storePictureUrl"}
                       onChange={setThumbnail}
                       ref={imgRef}
                />
            </div>
            <br/>
            <MenuInputTag
                id="storeReviewCount"
                label="리뷰 수"
                placeholder=""
                value={formData.storeReviewCount}
                onChange={handleChange}
                type="number"
                isEditing={false}
            />
            <MenuInputTag
                id="storeRating"
                label="평점"
                placeholder=""
                value={formData.storeRating}
                onChange={handleChange}
                type="number"
                isEditing={false}
            />
            {/*<AdditionalInfoForm formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} isEditing={isEditing}/>*/}
            <BasicInfoForm formData={formData} handleChange={handleChange} isEditing={isEditing}/>
            <OperationInfoForm formData={formData} handleChange={handleChange} isEditing={isEditing}/>
            <DeliveryInfoForm formData={formData} handleChange={handleChange} isEditing={isEditing}/>
            <LocationInfoForm formData={formData} handleChange={handleChange} isEditing={isEditing}/>
        </form>
    )
};
export default StoreMyStore;