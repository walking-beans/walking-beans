import orderCartDeleteBtnIcon from "../../images/user/orderCartDeleteBtn.svg"
import {Link, useNavigate, useParams} from "react-router-dom";
import "../../css/Cart.css"

const UserCart = ({cartId, menuName, menuPrice, optionName, optionPrice, onDelete}) => {
    //- <CartItem/> - 장바구니 아이템 div (메뉴명, 가격, 옵션, 추가가격)
    return (
        <div className="user-cart-container">
            <div className="user-cart-grid">
                <div className="user-cart-bordtext">{menuName}</div>
                <div className="user-cart-bordtext">{menuPrice}원</div>
            </div>
            <div className="user-cart-detailtext">{optionName}(+{optionPrice})</div>

            <button className="user-cart-remove" onClick={() => onDelete(cartId)}>
            <img src={orderCartDeleteBtnIcon} alt="장바구니 메뉴 삭제 버튼 아이콘"/>
            </button>
        </div>
    )
};

export default UserCart;