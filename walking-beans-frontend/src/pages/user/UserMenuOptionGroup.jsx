import "../../css/Order.css"
import UserMenuOption from "./UserMenuOption";
import {useState} from "react";

const UserMenuOptionGroup = ({optionName, options, selectedOptions, onOptionChange}) => {

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
                        checked={selectedOptions && selectedOptions.some(selected => selected.optionId === option.optionId)}
                        type="radio"
                        name={optionName}
                    />
                ))}
            </div>
        </div>
    )
};

export default UserMenuOptionGroup;