import "../../css/Order.css"

const UserMenuOption = ({optionContent, optionPrice, onChange, checked}) => {
    return (
        <div className="UserMenuOption-container">
            <div>
                <label className="user-order-optiontext">
                    <input
                        type="radio"
                        value={optionContent}
                        className="user-order-option-select"
                        onChange={onChange}
                        checked={checked}
                    />
                    {optionContent}
                </label>
                <div className="user-order-optiontext">+{optionPrice}원</div>
            </div>
        </div>
    )
};

export default UserMenuOption;