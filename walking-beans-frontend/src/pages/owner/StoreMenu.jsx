import {useEffect, useState} from "react";
import apiMenu from "../../service/apiMenu";


const StoreMenu = () => {
    const [menus, setMenus] = useState([]);
    const [err, setErr] = useState(null);

    useEffect(() => {
        apiMenu.fetchAllMenu(setMenus,setErr)
    }, []);


    return(
        <div className="container mt-4">
            <h2 className="text-center fw-bold">메뉴 목록</h2>
                <div className="row">
                    {menus.map((menu) => (
                        <div className="col-4" key={menu.menuId}>
                            <div className="card shadow-sm">
                                <img
                                    src={`${menu.menuPictureUrl}` || 'https://via.placeholder.com/300x200.png?text=No+Image'}
                                    className="card-img-top"
                                    alt={menu.menuName}
                                    style={{height: '200px', objectFit: 'cover'}}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{menu.menuName}</h5>
                                    <p className="card-text">가격: {menu.menuPrice}원</p>
                                    <button className="btn btn-primary btn-sm">자세히 보기</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

    )
}

export default StoreMenu;