import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import MenuInputTag from "../../components/owner/MenuInputTag";
import blankImg from "../../assert/images/menu/default-menu-img.png";
import axios from "axios";


const StoreMenuRegister = () => {
    const navigate = useNavigate();
    const {storeId}= useParams();
    const [userId, setUserId] = useState();
    const [formData, setFormData] = useState({ // 초기화세팅
        menuName: "",
        menuPrice: 0,
        menuCategory: "",
        menuDescription: "",
        menuPictureUrl: "",
    });
    const [imgFile, setImgFile] = useState("");
    const [isLoading, setIsLoading] = useState(true); // 로딩중 상태
    const imgRef=useRef();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            console.log("유저정보 : " + userData);//
            setUserId(userData.user_id);
            console.log("storeId:", storeId, "userId:", userId); // 디버깅 로그 추가
        }
    }, [userId]);


    //로딩상태변경


    // 썸네일 보여주기
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

    // 폼데이터 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append("menuName", formData.menuName);
        submitData.append("menuPrice", formData.menuPrice);
        submitData.append("menuCategory", formData.menuCategory);
        submitData.append("menuDescription", formData.menuDescription);
        if (imgRef.current?.files[0]) {
            submitData.append("menuPictureUrl", imgRef.current.files[0]);
        }

        console.log("전송 데이터", [...submitData.entries()]); // 디버깅용

        // 권한 확인 및 return애 따라서 페이지 이동
        axios
            .post(`http://localhost:7070/api/menu/owner/${storeId}/menu/resister/${userId}`,
                submitData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"

                    },withCredentials: true,

                })
            .then((res) => {
                console.log(res.data)
                alert("메뉴가 성공적으로 저장되었습니다.!")
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



    return (
        <div className="StoreMenuRegister-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <img style={{maxWidth: '600px', marginTop: '10px'}}
                         src={imgFile ? imgFile : blankImg }
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

                <button type={"submit"}>메뉴 저장하기</button>
                <Link to={`/owner/${storeId}/menu`}>
                <button type="button" >메뉴목록으로 돌아가기</button>
                </Link>
            </form>
        </div>
    )
}

export default StoreMenuRegister;