import apiMenu from "../../service/apiMenu";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const MenuDetailForm = () => {
    const {id} = useParams();
    const [menus,setMenus] = useState("");

    axios
        .put(`http://localhost:7070/api/menu/${id}`,FormData)
        .then( (res)=>{
            setMenus(res.data);
        })
        .catch( (err)=>{console.log(err)})

    const handlePreview = () => {

    }








    return (
        <div className="MenuDetailForm-container">
            <div className="image-preview">
                <img id="imgPre" src=""/>
                <label htmlFor="imgPre">이미지 변경하기</label>
                <input type="file" id="imgPre" accept="image/*"/>
            </div>
            <label htmlFor="menuName">메뉴 이름 : </label>
            <input id="menuName" name="name" required type="text"/>

            <label htmlFor="menuPrice">메뉴 가격 : </label>
            <input id="menuPrice" name="price" required type="number"/>

            <label htmlFor="menuDescription">메뉴 설명 : </label>
            <textarea id="menuDescription" name="description" required></textarea>

            <div className="button">
                <button className="btn" id="editForm" type="button">수정완료</button>
                <a className="btn" href="/owner/menu">목록으로 돌아가기</a>
                <a className="btn" id="editCancel">수정 취소하기</a>
            </div>
        </div>
    )
}

export default MenuDetailForm;