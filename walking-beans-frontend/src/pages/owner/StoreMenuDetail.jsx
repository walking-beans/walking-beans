import {useEffect, useRef, useState} from "react";
import apiMenu from "../../service/apiMenu";
import MenuInputTag from "../../components/owner/MenuInputTag";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


const StoreMenuDetail = () => {
    const navigate = useNavigate();
    // 메뉴 정보
    const {storeId} = useParams();
    const {menuId} = useParams();

    const [menus, setMenus] = useState({});
    const [formData, setFormData] = useState({});
    const [imgFile, setImgFile] = useState("");
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const imgRef = useRef();

    // 데이터 초기화 함수
    const updateFormData = (data) =>{
        console.log("updateFormData 호출, 받은 데이터:", data);
        const newFormData = {
            menu_id: menuId,
            menuName: data.menuName || "",
            menuPrice: data.menuPrice || 0,
            menuCategory: data.menuCategory || "",
            menuDescription: data.menuDescription || "",
            menuPictureUrl: data.menuPictureUrl || "",
        };
        setFormData(newFormData);
        console.log("업데이트된 formData:", newFormData);
        setIsLoading(false); // 데이터 로드 완료
    };

    // 초기값 가져오기
    useEffect(() => {
        console.log("renderingCheck")
        if (menuId) {
            apiMenu.findAllMenuById(menuId,setMenus,updateFormData);
            /*
            axios
                .get(`http://localhost:7070/api/menu/${menuId}`)
                .then((res) => {
                    console.log(res)
                    setMenus(res.data);
                    updateFormData(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })*/
            // setIsLoading(false);

        }
    }, [menuId]);

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

    // 인풋 변경 제어
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // 폼 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append("menu_id", menuId);
        submitData.append("menuName", formData.menuName);
        submitData.append("menuPrice", formData.menuPrice);
        submitData.append("menuCategory", formData.menuCategory);
        submitData.append("menuDescription", formData.menuDescription);
        if (imgRef.current?.files[0]) {
            submitData.append("menuPictureUrl", imgRef.current.files[0]);
        } // 기존 URL 유지시 값을 보내지 않음. patch

        console.log("전송 데이터:", [...submitData.entries()]); // 디버깅용

        // 권한 확인 및 반응에 따라서 페이지 이동 기능 포함.
        axios
            .patch(`http://localhost:7070/api/menu/owner/${storeId}/menu/${menuId}`,
                submitData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"

                    },withCredentials: true,

                })
            .then((res) => {
                console.log(res.data)
                alert("메뉴가 성공적으로 수정되었습니다.!")
                navigate(`/owner/${storeId}/menu`) // 수정 완료후 이동 페이지
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    alert("로그인이 필요합니다.");
                    navigate("/owner");
                } else if (err.response?.status === 403){
                    alert("메뉴 수정 권한이 없습니다.");
                    navigate("/owner");
                } else {
                console.log(err)
                alert("서버 오류로 인해 데이터를 전송하지 못했습니다. 잠시후 다시 시도해주세요.")
                }
            })

    }

    const handleDelete = () => {
    // 메뉴삭제 작성필요
    }


    return (
        <>
            <div className={"StoreMenuDetail-container"}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <img style={{maxWidth: '600px', marginTop: '10px'}}
                             src={imgFile ? imgFile : menus.menuPictureUrl}
                             alt={"메뉴 이미지"}
                        />
                        <label htmlFor={"menuPicture"} className={"form-label"}></label>
                        <input className={"form-control form-control-lg"}
                               id={"menuPicture"}
                               type={"file"}
                               name={"menuPictureUrl"}
                               onChange={setThumbnail}
                               ref={imgRef}
                        />
                    </div>
                    <br/>
                    <MenuInputTag
                        id="menuName"
                        label="메뉴 이름"
                        placeholder="제육볶음"
                        value={formData.menuName}
                        onChange={handleInputChange}
                        required={true}
                    />
                    <MenuInputTag
                        id="menuCategory"
                        label="카테고리"
                        placeholder="한식"
                        value={formData.menuCategory}
                        onChange={handleInputChange}
                        required={true}
                    />
                    <MenuInputTag
                        id="menuPrice"
                        label="가격"
                        placeholder="10000"
                        value={formData.menuPrice}
                        onChange={handleInputChange}
                        type="number"
                        required={true}
                    />
                    <MenuInputTag
                        id="menuDescription"
                        label="메뉴 설명"
                        placeholder="제육볶음은 맛있습니다."
                        value={formData.menuDescription}
                        onChange={handleInputChange}
                    />
                    <MenuInputTag
                        id="menuModifiedDate"
                        label="수정일"
                        placeholder="수정일"
                        value={menus.menuModifiedDate || ""}
                        onChange={() => {}}
                        isEditing={false} // 수정 불가
                    />
                    <button type={"submit"}>수정완료</button>
                    <button type="button" onClick={handleDelete}>삭제하기</button>
                </form>
            </div>
        </>
    )
}

export default StoreMenuDetail;