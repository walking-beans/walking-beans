

const MenuOptionGroup = ({optionId,name,modifiedDate,price,handleDelete}) => {
    //메뉴id에 속한 메뉴옵션들 그룹별로 표시
    return (
        <div className="row">

                <div className={"col-4"}>
                    {name}
                </div>
                <div className={"col-4"}>
                    {modifiedDate}
                </div>
                <div className={"col-2"}>
                    {price}
                </div>
                <div className={"col-2"}>
                    <button onClick={(e)=>handleDelete(e,optionId)}>삭제</button>
                </div>

        </div>
    )
}

export default MenuOptionGroup;