import "../../css/Order.css";

const UserMenuOption = ({optionContent, optionPrice, onChange, checked}) => {

    return (
        <div className="user-menu-option-container">
            <div className="user-order-option-info">
                <label className="user-order-optiontext">
                    <input
                        type="checkbox"
                        className="user-order-option-select"
                        onChange={onChange}
                        checked={checked || false}
                    />
                    <div className="user-order-optioncontent">{optionContent}</div>
                </label>
            <div className="user-order-optiontext">+{optionPrice}원</div>
            </div>
        </div>
    )
        ;
};

export default UserMenuOption;