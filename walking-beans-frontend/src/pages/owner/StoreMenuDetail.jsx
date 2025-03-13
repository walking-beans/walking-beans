import {useEffect, useRef, useState} from "react";
import apiMenu from "../../service/apiMenu";
import MenuInputTag from "../../components/owner/MenuInputTag";
import axios from "axios";
import {useParams} from "react-router-dom";


const StoreMenuDetail = () => {
    // 메뉴 정보
    const {id} = useParams();
    const [menus,setMenus] = useState({});
    const [formData , setFormData] = useState({
        menu_id: id,
        menuName: "",
        menuPrice: 0,
        menuCategory: "",
        menuDescription: "",
        menuPictureUrl: "",
    });
    const [imgFile,setImgFile]=useState("");
    const imgRef = useRef();

   // const [isLoading, setIsLoading] = useState(true); // 로딩상태 관리
    // 초기값 가져오기
    useEffect(() => {
        console.log("renderingCheck")
        if(id) {
            axios
                .get(`http://localhost:7070/api/menu/${id}`)
                .then((res) => {
                    console.log(res)
                    setMenus(res.data);
                    setFormData({
                        menu_id: id,
                        menuName: res.data.menuName || "",
                        menuPrice: res.data.menuPrice || 0,
                        menuCategory: res.data.menuCategory ||"",
                        menuDescription:res.data.menuDescription || "",
                        menuPictureUrl:res.data.menuPictureUrl || "",
                    });
                })
                .catch((err) => {
                    console.log(err)
                })
           // setIsLoading(false);

        }

    }, [id]);






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
    const handleSubmit =(e)=>{
        e.preventDefault();
            const submitData = new FormData();
            submitData.append("menu_id", id);
            submitData.append("menuName", formData.menuName);
            submitData.append("menuPrice", formData.menuPrice);
            submitData.append("menuCategory", formData.menuCategory);
            submitData.append("menuDescription", formData.menuDescription);
        if (imgRef.current?.files[0]) {
            submitData.append("menuPictureUrl", imgRef.current.files[0]);
        }
            console.log(submitData);
            axios
                .put(`http://localhost:7070/api/menu/${id}`,
                    submitData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },

                    })
                .then((res) => {
                    console.log(res.data)
                    alert("수정완료!")
                })
                .catch((err) => {
                    console.log(err)
                    alert("데이터를 전송하지 못했습니다. 잠시후 다시 시도해주세요.")
                })

    }

    const handleDelete = () => {

    }
    // 인풋 변경 제어
    const handleInputChange = (e) => {
        const{name,value} = e.target;
        setFormData( {
            ...formData,
            [name]: value,
        });
    }
    // 로딩중 상태 추가
    /*if (isLoading){
        return <div> 로딩중 ...</div>;
    }*/
    return (
        <>
            <div className={"StoreMenuDetail-container"}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <img style={{ maxWidth: '600px', marginTop: '10px' }}
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
                    <button type={"submit"} >수정완료</button>
                    <button type="button" onClick={handleDelete}>삭제하기</button>
                </form>
            </div>
        </>
    )
}

export default StoreMenuDetail;