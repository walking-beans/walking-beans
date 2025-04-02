import {useEffect, useState} from "react";
import apiMenu from "../../service/apiMenu";
import {useNavigate, useParams} from "react-router-dom";
import HorizentalCategory from "../../components/owner/HorizentalCategory";
import MenuCard from "../../components/owner/MenuCard";
import SelectCategory from "../../components/owner/SelectCategory";


const StoreMenu = () => {
    const {id} = useParams();
    const [menus, setMenus] = useState([]);
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const [barrel, setBarrel] = useState(true); // 1열 3열 변환 버튼용 Ture 일때 1열
    /*
    const [menuResult, setMenuResult] = useState("");
    const searchResult = (handOver) => {
        setMenuResult(handOver)
    }
*/


    const [value,setValue] = useState(null); // 카테고리 값 자식컴포넌트에게 전달받음
    const gettingValue = handOverValue => {
        console.log("부모가 받은 값:", handOverValue);
        setValue(handOverValue);
    }

    useEffect(() => {
        apiMenu.fetchAllMenu(id,setMenus, setErr)
    }, []);

    const handleDelete = () => {

        if (window.confirm("정말 삭제하시겠습니까?")) {
            //API자리
            navigate("/clothes");
        }
    }
    const handleRow = () => {// 1열 3열 변경 핸들러
        if (barrel) {
            setBarrel(false)
        } else {
            setBarrel(true)
        }
    }


    // 카테고리 이름으로 필터
    const filterMenus = menus.filter((menus)=>{
        return menus.menuCategory.trim().includes(value);
    });



    return (
        <>

            <HorizentalCategory
                gettingValue={gettingValue}

            />

            <div>
                <p className="col-1">{filterMenus.length}개</p>
                <button className={"col-1"} onClick={handleRow}>{barrel ? "3열 보기" : "1열 보기"}</button>
                <div className={"row"}>
                    {filterMenus.map((menus) => (
                        <MenuCard key={menus.menuId}
                                  {...menus}
                                  price={menus.menuPrice}
                                  menuPictureUrl={menus.menuPictureUrl}
                                  handleDelete={handleDelete}
                                  barrel={barrel}/>

                    ))}
                </div>
            </div>


        </>
    )
}

export default StoreMenu;