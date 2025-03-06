import {useEffect, useState} from "react";
import apiMenu from "../../service/apiMenu";
import {useNavigate} from "react-router-dom";
import HorizentalCategory from "../../components/owner/HorizentalCategory";
import MenuCard from "../../components/owner/MenuCard";


const StoreMenu = () => {
    const [menus, setMenus] = useState([]);
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const [barrel, setBarrel] = useState(true); // 1열 3열 변환 버튼용 Ture 일때 1열

    useEffect(() => {
        apiMenu.fetchAllMenu(setMenus,setErr)
    }, []);

    const handleDelete = () => {

        if(window.confirm("정말 삭제하시겠습니까?")){
            apiClothesService.deleteClothes(clothes.cid);
            navigate("/clothes");
        }
    }
    const handleRow = () =>{

        if(barrel){
            setBarrel(false)

        } else {
            setBarrel(true)

        }

    }


    return(
        <>
            <HorizentalCategory/>

            <div>
                <p className="col-1">{/*data.length*/}개</p>
                <button className={"col-1"} onClick={handleRow}>{barrel ? "3열 보기" : "1열 보기"}</button>
                <div className={"row"}>
                    {menus.map((menus)=>(
                        <MenuCard key={menus.id}
                            {...menus}
                            price={menus.price.toLocaleString()}
                            handleDelete={handleDelete}
                            barrel={barrel}/>

                    ))}
                </div>
            </div>

        </>
    )
}

export default StoreMenu;