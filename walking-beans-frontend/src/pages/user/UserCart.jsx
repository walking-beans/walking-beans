import orderCartDeleteBtnIcon from "../../images/user/orderCartDeleteBtn.svg"
import "../../css/Cart.css"

const UserCart = ({cartId, menuName, menuPrice, optionName, optionPrice, onDelete}) => {

    const totalPrice = Number(menuPrice) + Number(optionPrice);
    return (
        <div className="user-cart-container">
            <div className="user-cart-grid">
                <div className="user-cart-bordtext">{menuName}</div>
                <div className="user-cart-bordtext">{totalPrice.toLocaleString()}원</div>
            </div>
            <div className="user-cart-detailtext">{optionName}(+{Number(optionPrice).toLocaleString()})</div>

            <button className="user-cart-remove" onClick={() => onDelete(cartId)}>
            <img src={orderCartDeleteBtnIcon} alt="장바구니 메뉴 삭제 버튼 아이콘"/>
            </button>
        </div>
    )
};

export default UserCart;