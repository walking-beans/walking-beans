import orderCartDeleteBtnIcon from "../../images/user/orderCartDeleteBtn.svg"
import "../../css/Cart.css"
import React from "react";

const UserOrderMenuForm = ({cartId, optionPrice, handleDelete, optionContent, cartName, cartPrices}) => {
    // 문자열로 되어있는 가격과 옵션들을 배열로 변환
    const menuNames = cartName ? cartName.split(',') : [];  // 메뉴 이름들
    const menuPrices = cartPrices ? cartPrices.split(',') : [];  // 가격들

    return (
        <div>
            <div className="user-order-menu-form">
                <div>
                    {/* 메뉴 이름 목록을 출력 */}
                    {menuNames.length > 0 ? (
                        menuNames.map((name, index) => (
                            <div key={index}>
                                <div className="user-order-basic-text-m-0">{name}</div>
                                <div className="store-menu-price">{optionContent}(+{Number(optionPrice).toLocaleString()}원)</div>
                                <div className="user-order-basic-text-m-0">
                                    {(Number(menuPrices[index]) + Number(optionPrice)).toLocaleString()}원
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>메뉴 정보가 없습니다.</div>
                    )}
                </div>

                <div>
                    <button className="user-cart-remove" onClick={() => handleDelete(cartId)}>
                        <img src={orderCartDeleteBtnIcon} alt="장바구니 메뉴 삭제 버튼 아이콘"/>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default UserOrderMenuForm;