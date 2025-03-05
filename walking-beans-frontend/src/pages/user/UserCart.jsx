import orderCartDeleteBtnIcon from "../../images/user/orderCartDeleteBtn.svg"
import {Link, useNavigate, useParams} from "react-router-dom";
import apiUserOrderService from "./apiUserOrderService";
import {useEffect, useState} from "react";
const UserCart = () => {

    //- <CartItem/> - 장바구니 아이템 div (메뉴명, 가격, 옵션, 추가가격)

    const {cartId } = useParams();
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            console.log("cartId:", cartId); // ✅ cartId 값 확인
            if (cartId) {
                const data = await apiUserOrderService.getUserOrderByCartId(cartId);
                console.log("받아온 데이터:", data); // ✅ 응답 데이터 확인
                if (data) {
                    setCart(data);
                }
            }
        };
        fetchCart();
    }, [cartId]);

    const handleDelete = () => {
        apiUserOrderService.deleteUserOrderCart(cartId)
            .then((res) => {
                if (res) {
                    console.log("삭제 성공", res);
                    setCart(null);
                    navigate("/carts");
                }
            })
            .catch((err) => {
                console.error("삭제 실패", err);
                alert("메뉴 삭제에 실패하였습니다. 다시 시도해 주세요.");
            });
    };


    return(
    <div className="usercart-container">
        <div>장바구니</div>
        {cart ? (
            <div>
                <div>메뉴명: {cart.menuName}</div>
                <div>가격: {cart.menuPrice}</div>
                <div>옵션: {cart.optionName} (+{cart.optionPrice})</div>

                <Link onClick={handleDelete}>
                    <img src={orderCartDeleteBtnIcon} alt="장바구니 메뉴 삭제 버튼 아이콘"/>
                </Link>

                <button>주문하기</button>
            </div>

        ) : (
            <div>장바구니 로딩 중...</div>
        )}
    </div>
    )
};

export default UserCart;