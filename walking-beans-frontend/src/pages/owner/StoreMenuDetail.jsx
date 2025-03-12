import {useEffect, useRef, useState} from "react";
import apiMenu from "../../service/apiMenu";
import MenuInputTag from "../../components/owner/MenuInputTag";
import axios from "axios";
import {useParams} from "react-router-dom";


const StoreMenuDetail = () => {
    // 메뉴 정보
    const {id} = useParams();
    const [menus,setMenus] = useState([]);
    const [formData , setFormData] = useState({
        menu_id: id,
        menuName: "",
        menuPrice: 0,
        menuCategory: "",
        menuDescription: "",
        menuPictureUrl: "",
    });

    useEffect(() => {
        console.log("renderingCheck")
        if(id) {
            axios
                .get(`http://localhost:7070/api/menu/${id}`)
                .then((res) => {
                    console.log(res)
                    setMenus(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }, []);

    const [imgFile,setImgFile]=useState("");
    const imgRef = useRef();
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

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(formData);
                axios
                    .put(`http://localhost:7070/api/menu/${id}`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },

                        })
                    .then( (res)=>{
                        console.log(res.data)
                        alert("수정완료!")
                    } )
                    .catch( (err)=>{
                        console.log(err)
                        alert("데이터를 전송하지 못했습니다. 잠시후 다시 시도해주세요.")
                    } )

    }

    const handleDelete = () => {

    }
    const handleInputChange = (e) => {
        const{name,value} = e.target;
        setFormData( {
            ...formData,
            [name]: value,
        });
    }

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
                               defaultValue={""}
                               name={"menuPictureUrl"}
                               onChange={setThumbnail}
                               ref={imgRef}
                               onSubmit={handleInputChange}

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
                               onchange={handleInputChange}
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
                               onchange={handleInputChange}
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
                               onchange={handleInputChange}
                        />
                        <label htmlFor={"floatingInput"}>가격</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <textarea
                               className="form-control"
                               id={"floatingTextarea"}
                               placeholder={"제육볶음은 맛있습니다."}
                               Value={menus.menuDescription}
                               name={"menuDescription"}
                               onchange={handleInputChange}
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
                    <button>수정완료</button>
                    <button type="button" onClick={handleDelete}>삭제하기</button>
                </form>
            </div>
        </>
    )
}

export default StoreMenuDetail;