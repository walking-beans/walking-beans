import {useState} from "react";
import apiMenu from "../../service/apiMenu";
import MenuInputTag from "../../components/owner/MenuInputTag";


const StoreMenuDetail = () => {

    // 메뉴 정보
    const [formData , setFormData] = useState({
    menu_name:"",
    menu_price:"",
    menu_category:"",
    menu_description:"",
    menu_picture:"",
    });
    const inputFields = [
        {id:"menu_name", label:"이름", placeholder:""},
        {id:"menu_price", label:"가격", placeholder:""},
        {id:"menu_category", label:"카테고리 예) 에스프레소,라떼,차,음식 등", placeholder:""},
        {id:"menu_description", label:"메뉴 설명", placeholder:""},
        {id:"menu_picture", label:"사진", placeholder:""},
    ]
    const handleChange =(e)=>{
        const{name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target; // 유효성 검사 체크
        if(!form.checkValidity()){
            form.classList.add("was-validated")
        }

        apiMenu.insertMenu(formData);
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
                    <button>메뉴삭제</button>*/
    return (
        <>
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
        </>
    )
}

export default StoreMenuDetail;