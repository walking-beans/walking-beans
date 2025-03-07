import {useState} from "react";

const SelectCategory = (searchResult,menus) => {

    const [Input, setInput] = useState(""); // 유저 입력 검색어

    const handleChange = (e) => {
        setInput(e.target.value);
    }
    // 카테고리 이름으로 필터
    const filterMenus = menus.filter((menus)=>{
        return menus.menuCategory.trim().includes(Input.trim());
    });

    return (
        <div className="SearchMenu-container">
            <input/>
        </div>
    )
}

export default SelectCategory;