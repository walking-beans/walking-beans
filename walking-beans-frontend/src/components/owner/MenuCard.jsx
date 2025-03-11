import {Link} from "react-router-dom"

const MenuCard = ({id,name,price,handleDelete,barrel}) => {

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
                                     src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..."/>
                            </div>
                            <div className="col-md-6">
                                <div className="small mb-1">{name}</div>
                                <h1 className="display-5 fw-bolder"></h1>
                                <div className="fs-5 mb-5">
                                    <span>{price}</span>
                                </div>
                                <p className="lead">
                                </p>
                                <div className="d-flex">
                                    <input className="form-control text-center me-3" id="inputQuantity" type="num" value="1"
                                           style={{maxWidth: 3 + 'rem'}}/>
                                    <Link to={`/clothes/${id}`}>
                                        <button className="btn btn-outline-warning">자세히보기</button>
                                    </Link>
                                    {/* ✅ 삭제 버튼 */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                :
                <div class={"col-4 mb-5"} key={id}>
                    {/* false 일때, 3열뷰 */}
                    <Link to={`/clothes/${id}`}>

                        <div class="card h-100">
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                 alt="Fancy Product"/>
                            <div class="card-body p-4 text-center">
                                <h5 class="fw-bolder">

                                    <p class="text-decoration-none">{name}</p>
                                </h5>
                                {price}원
                            </div>
                        </div>
                    </Link>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <button class="btn btn-outline-dark mt-auto" onClick={handleDelete}>삭제</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MenuCard;