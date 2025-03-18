import "../../css/Order.css"
import UserMenuOption from "./UserMenuOption";
import {useState} from "react";

const UserMenuOptionGroup = ({optionName, options, selectedOption, onOptionChange}) => {


    return (
        <div className="user-menu-option-group-container">
            <div className="user-order-optiontitle">{optionName}</div>
            <div className="user-menu-option-list">
                {options.map((option) => (
                    <UserMenuOption
                        key={option.optionId}
                        optionContent={option.optionContent}
                        optionPrice={option.optionPrice}
                        onChange={() => onOptionChange(optionName, option)}
                        checked={selectedOption && selectedOption.optionId === option.optionId}  // 선택된 옵션이 있으면 checked가 true
                    />
                ))}
            </div>
        </div>
    )
};

export default UserMenuOptionGroup;