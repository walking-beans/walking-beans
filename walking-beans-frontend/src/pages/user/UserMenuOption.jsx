import "../../css/Order.css";
import { useState } from "react";

const UserMenuOption = ({optionContent, optionPrice, onChange, checked, type="checkbox", name}) => {
    const [isSelected, setIsSelected] = useState(checked);

    const handleClick = () => {
        const newState = !isSelected;
        setIsSelected(newState);
        onChange(newState);
    };

    return (
        <div className="user-menu-option-container">
            <div className="user-order-option-info">
                <label className="user-order-optiontext">
                    <input
                        type={type}
                        name={name}
                        className="user-order-option-select"
                        checked={checked || false}
                        onChange={onChange}
                        onClick={type === "radio" ? handleClick : undefined}
                    />
                    <div className="user-order-optioncontent">{optionContent}</div>
                </label>
                <div className="user-order-optiontext">+{optionPrice}원</div>
            </div>
        </div>
    );
};

export default UserMenuOption;