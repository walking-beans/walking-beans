
import React from "react";
import defaultImage from "../../images/user/defaultimage.svg";
const StoreMenuForm = ({ menuName, menuPrice, onClick }) => {
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }}>
            <div>
                <img src={defaultImage} alt="메뉴 이미지" />
            </div>
            <div>{menuName}</div>
            <div>{Number(menuPrice).toLocaleString()}원</div>
        </div>
    );
};
export default StoreMenuForm;


/*
import React from "react";
import defaultImage from "../../images/user/defaultimage.svg"

const StoreMenuForm = ({menuName, selectOptions, menuPrice, storeId}) => {

    return (
        <div>
            <div onClick={() => selectOptions(storeId)}>
                <div><img src={defaultImage} alt="메뉴 이미지"/></div>
                <div>{menuName}</div>
                <div>{Number(menuPrice).toLocaleString()}원</div>
            </div>
        </div>
    )
};
export default StoreMenuForm;
*/