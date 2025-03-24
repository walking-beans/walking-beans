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
    const [formData, setFormData] = useState({
        menu_id: menuId,
        menuName: "",
        menuPrice: 0,
        menuCategory: "",
        menuDescription: "",
        menuPictureUrl: "",
    });
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const updateFormData = (data) =>{
        setFormData({
            menu_id: menuId,
            menuName: data.menuName || "",
            menuPrice: data.menuPrice || 0,
            menuCategory: data.menuCategory || "",
            menuDescription: data.menuDescription || "",
            menuPictureUrl: data.menuPictureUrl || "",
        });
    };
    // const [isLoading, setIsLoading] = useState(true); // 로딩상태 관리
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
        }
        console.log(submitData);
        // 권한 확인 및 반응에 따라서 페이지 이동 기능 포함.
        axios
            .put(`http://localhost:7070/api/menu/owner/${storeId}/menu/${menuId}`,
                submitData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"

                    },withCredentials: true,

                })
            .then((res) => {
                console.log(res.data)
                alert("메뉴가 성공적으로 수정되었습니다.!")
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
    // 인풋 변경 제어
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    // 로딩중 상태 추가
    /*if (isLoading){
        return <div> 로딩중 ...</div>;
    }*/

    // 세션 확인
/*
    useEffect(() => {
        // 쿠키에서 JSESSIONID 확인
        const getJSessionId = () => {
            const cookies = document.cookie.split("; ");
            for (let cookie of cookies) {
                const [name, value] = cookie.split("=");
                if (name === "JSESSIONID") {
                    console.log("JSESSIONID:", value);
                    return value;
                }
            }
            console.log("JSESSIONID를 찾을 수 없습니다.");
            return null;
        };

        getJSessionId();

        // 서버에서 JSESSIONID 확인
        axios
            .get("http://localhost:8080/api/users/getSessionData", {
                withCredentials: true, // 세션 쿠키(JSESSIONID)를 포함
            })
            .then((response) => {
                console.log("서버에서 받은 JSESSIONID:", response.data.JSESSIONID);
                console.log("전체 응답:", response.data);
            })
            .catch((error) => {
                console.error("세션 확인 오류:", error);
            });
    }, []);

*/

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
                    <div className={"form-floating mb-3"}>
                        <input type={"text"}
                               className="form-control"
                               id={"floatingInput"}
                               placeholder={"제육볶음"}
                               Value={menus.menuName}
                               name={"menuName"}
                               onChange={handleInputChange}
                        />
                        <label htmlFor={"floatingInput"}>메뉴 이름</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <input type={"text"}
                               className="form-control"
                               id={"floatingInput"}
                               placeholder={"제육볶음"}
                               Value={menus.menuCategory}
                               name={"menuCategory"}
                               onChange={handleInputChange}
                        />
                        <label htmlFor={"floatingInput"}>카테고리</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <input type={"number"}
                               className="form-control"
                               id={"floatingInput"}
                               placeholder={"제육볶음"}
                               Value={menus.menuPrice}
                               name={"menuPrice"}
                               onChange={handleInputChange}
                        />
                        <label htmlFor={"floatingInput"}>가격</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <input type={"text"}
                               className="form-control"
                               id={"floatingTextarea"}
                               placeholder={"제육볶음은 맛있습니다."}
                               Value={menus.menuDescription}
                               name={"menuDescription"}
                               onChange={handleInputChange}
                        />
                        <label htmlFor={"floatingTextarea"}>메뉴 설명</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <input type={"text"}
                               className="form-control"
                               id={"floatingInput"}
                               placeholder={"제육볶음"}
                               defaultValue={menus.menuModifiedDate}
                               name={"menuModifiedDate"}
                               onChange={() => {
                               }}
                               disabled
                        />
                        <label htmlFor={"floatingInput"}>수정일</label>
                    </div>
                    <button type={"submit"}>수정완료</button>
                    <button type="button" onClick={handleDelete}>삭제하기</button>
                </form>
            </div>
        </>
    )
}

export default StoreMenuDetail;