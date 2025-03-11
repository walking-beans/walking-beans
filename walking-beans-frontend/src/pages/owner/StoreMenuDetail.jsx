import {useEffect, useState} from "react";
import apiMenu from "../../service/apiMenu";
import MenuInputTag from "../../components/owner/MenuInputTag";
import axios from "axios";
import {useParams} from "react-router-dom";


const StoreMenuDetail = () => {
    // 메뉴 정보
    const {id} = useParams();
    const [menus,setMenus] = useState([]);
    const [formData , setFormData] = useState({
    menu_name:"",
    menu_price:"",
    menu_category:"",
    menu_description:"",
    menu_picture:"",
    });
    /*
    const inputFields = [
        {id:"menu_name", label:"이름", placeholder:"메뉴 이름을 작성해주세요 "},
        {id:"menu_price", label:"가격", placeholder:"메뉴 이름을 작성해주세요"},
        {id:"menu_category", label:"카테고리 예) 에스프레소,라떼,차,음식 등", placeholder:"메뉴 이름을 작성해주세요"},
        {id:"menu_description", label:"메뉴 설명", placeholder:"메뉴 이름을 작성해주세요"},
        {id:"menu_picture", label:"사진", placeholder:"메뉴 이름을 작성해주세요"},
    ]
    */
    /*
    const handleChange =(e)=>{
        const{name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    */
    useEffect(() => {
        console.log("renderingCheck")
        if(id) {
            axios
                .get(`http://localhost:7070/api/menu/${id}`)
                .then((res) => {
                    console.log(res)
                    setMenus(res.data);
                    setFormData({
                        menu_name:menus.menuName,
                        menu_price:menus.menuPrice,
                        menu_category:menus.menuCategory,
                        menu_description:menus.menuDescription,
                        menu_picture:menus.menuPictureUrl,
                    })
                    console.log(formData)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }, []);

    const [imgFile,setImgFile]=useState("");
    const setThumbnail = (value, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImgFile(reader.result);
            };
        }
        setFormData( (form)=>({
            ...form,
            [value]: event.target.value,
        }));

    };

    const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target; // 유효성 검사 체크
        if(!form.checkValidity()){
            form.classList.add("was-validated")
        }

        apiMenu.updateMenu(id,formData);
    }

    const handleDelete = () => {

    }
    const handleInputChange = (value, event) => {
        setFormData( (form)=>({
            ...form,
            [value]: event.target.value,
        }));
    }
/*
*     <p>메뉴 사진 menu_picture</p>
                    <p>이름: menu_name</p>
                    <p>가격: menu_price</p>
                    <p>카테고리: menu_category</p>
                    <p>설명: menu_description</p>
                    <p>생성일자: menu_create_date</p>
                    <p>수정일자: menu_modiffied_date</p>
                    <p>파람파람 {}</p>

                    <button>수정완료</button>
                    <button>메뉴삭제</button>
                    *
                    *
           <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        {inputFields.map(
                            (field)=>(
                            <MenuInputTag key={field.id}
                                {...field}
                                placeholder={field.placeholder}
                                value={formData[field.id]}
                                onChange={handleChange}
                                required
                            />)
                        )}
                        <button>등록하기</button>
                    </form>
                </div>
            </div>

*/
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
                               onChange={(e)=> setThumbnail("menu_picture",e)}

                        />
                    </div>
                    <br/>
                    <div className={"form-floating mb-3"}>
                        <input type={"text"}
                               className="form-control"
                               id={"floatingInput"}
                               placeholder={"제육볶음"}
                               defaultValue={menus.menuName}
                               onChange={(e) => handleInputChange("menu_name",e)
                               }
                        />
                        <label htmlFor={"floatingInput"}>메뉴 이름</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <input type={"text"}
                               className="form-control"
                               id={"floatingInput"}
                               placeholder={"제육볶음"}
                               defaultValue={menus.menuCategory}
                               onChange={() => {
                               }}
                        />
                        <label htmlFor={"floatingInput"}>카테고리</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <input type={"number"}
                               className="form-control"
                               id={"floatingInput"}
                               placeholder={"제육볶음"}
                               defaultValue={menus.menuPrice}
                               onChange={() => {
                               }}
                        />
                        <label htmlFor={"floatingInput"}>가격</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <textarea
                               className="form-control"
                               id={"floatingTextarea"}
                               placeholder={"제육볶음은 맛있습니다."}
                               defaultValue={menus.menuDescription}
                               onChange={() => {
                               }}
                        />
                        <label htmlFor={"floatingTextarea"}>메뉴 설명</label>
                    </div>

                    <div className={"form-floating mb-3"}>
                        <input type={"text"}
                               className="form-control"
                               id={"floatingInput"}
                               placeholder={"제육볶음"}
                               defaultValue={menus.menuModifiedDate}
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