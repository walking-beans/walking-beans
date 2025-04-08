import {Link} from "react-router-dom"
import {useState} from "react";

const MenuCard = ({storeId,menuId,menuName,price,menuPictureUrl,handleDelete,barrel}) => {

    //id,name,price,
    //handleDelete 삭제버튼용 핸들러
    //barrel 1열/ 3열 변환 버튼
    // 3항연산자로  true 일때 1열뷰, false 일때 3열뷰
    return (
        <>
            {barrel
                ?
                <section className="py-5">
                    {/* true 일때, 1열뷰 */}
                    <div className="container px-4 px-lg-5 my-5">
                        <div className="row gx-4 gx-lg-5 align-items-center">
                            <div className="col-md-6">
                                <img className="card-img-top mb-5 mb-md-0"
                                     src={menuPictureUrl} alt={menuName}/>
                            </div>
                            <div className="col-md-6">
                                <div className="small mb-1">{menuName}</div>
                                <h1 className="display-5 fw-bolder"></h1>
                                <div className="fs-5 mb-5">
                                    <span>{price}원</span>
                                </div>
                                <p className="lead">
                                </p>
                                <div className="d-flex">
                                    <input className="form-control text-center me-3" id="inputQuantity" type="num"
                                           value="1"
                                           style={{maxWidth: 3 + 'rem'}}/>
                                    <Link to={`/owner/${storeId}/menu/${menuId}`}>
                                        <button className="btn btn-outline-warning">수정하기</button>
                                    </Link>
                                    <Link to={`/owner/${storeId}/${menuId}/menuoption`}>
                                        <button className="btn btn-outline-success">옵션관리</button>
                                    </Link>
                                    {/* ✅ 삭제 버튼 */}
                                        <button className="btn btn-outline-danger" onClick={() => handleDelete(menuId)} >삭제하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                :
                <div class={"col-4 mb-5"} key={menuId}>
                    {/* false 일때, 3열뷰 */}
                        <div class="card h-100">
                    <Link to={`/owner/${storeId}/menu/${menuId}`}>
                            <img class="card-img-top" src={menuPictureUrl}
                                 alt="Fancy Product"/>
                    </Link>
                            <div class="card-body p-4 text-center">
                                <h5 class="fw-bolder">

                                    <p class="text-decoration-none">{menuName}</p>
                                </h5>
                                <p>{price}원</p>
                        <div class="text-center">
                            <Link to={`/owner/${storeId}/menu/${menuId}`}>
                                <button class="btn btn-outline-warning" style={{ width: "120px", height: "40px", textAlign: "center" }}>수정</button>
                            </Link>
                            <Link to={`/owner/${storeId}/${menuId}/menuoption`}>
                            <button className="btn btn-outline-success" style={{ width: "120px", height: "40px", textAlign: "center" }}>옵션관리</button>
                            </Link>
                            <button class="btn btn-outline-danger" onClick={() => handleDelete(menuId)} style={{ width: "120px", height: "40px", textAlign: "center" }}>삭제</button>
                        </div>
                            </div>
                        </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    </div>
                </div>
            }
        </>
    )
}

export default MenuCard;