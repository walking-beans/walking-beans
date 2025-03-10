import "../../css/Order.css"

const UserMenuOptionGroup = ({optionName, optionContent}) => {
    return (
        <div className="-container">
            <fieldset className="UserMenuOptionGroup-container">
                <legend className="user-order-optiontitle">{optionName}</legend>
                {optionContent}
            </fieldset>
        </div>
    )
};

export default UserMenuOptionGroup;