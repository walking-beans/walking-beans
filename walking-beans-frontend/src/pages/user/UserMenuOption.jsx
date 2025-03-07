import "../../css/Order.css"

const UserMenuOption = ({optionContent, optionPrice}) => {
    return (
        <div className="UserMenuOption-container">
            <div>
                <label className="user-order-optiontext">
                    <input type="radio" value={optionContent} className="user-order-option-select"/>
                    {optionContent}
                </label>
                <div className="user-order-optiontext">{optionPrice}</div>
            </div>
        </div>
    )
};

export default UserMenuOption;