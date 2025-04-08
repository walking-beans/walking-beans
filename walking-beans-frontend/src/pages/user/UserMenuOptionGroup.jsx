import "../../css/Order.css"
import UserMenuOption from "./UserMenuOption";
import { useState } from "react";

// 옵션 카테고리별 조회 컴포넌트
const UserMenuOptionGroup = ({optionName, options, selectedOptions, onOptionChange}) => {
    // 처음에 옵션 선택이 안된채로 보임
    const [selectedOptionId, setSelectedOptionId] = useState(
        selectedOptions && selectedOptions.length > 0 ? selectedOptions[0].optionId : null
    );

    const handleOptionChange = (optionId, option) => {
        // 이미 선택된 옵션을 다시 클릭하면 선택 해제
        if (selectedOptionId === optionId) {
            setSelectedOptionId(null);
            onOptionChange(optionName, null);
        } else {
            // 새 옵션 선택
            setSelectedOptionId(optionId);
            onOptionChange(optionName, option);
        }
    };

    return (
        <div className="user-menu-option-group-container">
            <div className="user-order-optiontitle">{optionName}</div>
            <div className="user-menu-option-list">
                {options.map((option) => (
                    <UserMenuOption
                        key={option.optionId}
                        optionContent={option.optionContent}
                        optionPrice={option.optionPrice}
                        onChange={() => handleOptionChange(option.optionId, option)}
                        checked={selectedOptionId === option.optionId}
                        type="radio"
                        name={optionName}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserMenuOptionGroup;