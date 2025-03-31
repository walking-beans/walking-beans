const MenuInputTag = ({id, label, placeholder, value, onChange}) => {

    return (
        <div className="MenuInputTag-container">
            <div className="form-floating mb-3">
                <input className="form-control"
                       id={id}
                       name={id}
                       type="text"
                       placeholder={placeholder}
                       value={value}
                       onChange={onChange}
                       data-sb-validations="required"/>
                <label htmlFor={id}>{label} : </label>
                <div className="invalid-feedback" data-sb-feedback={`${id}:required`}>{/* + 대신 : */}
                    {label}은(는) 필수로 입력해야 합니다.
                </div>
            </div>
        </div>
    )
}

export default MenuInputTag;