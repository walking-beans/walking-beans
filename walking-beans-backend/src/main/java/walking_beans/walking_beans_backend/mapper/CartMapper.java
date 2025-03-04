package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.vo.CartItemDTO;

import java.util.List;

@Mapper
public interface CartMapper {
    // 메뉴 정보 저장 (order랑 같이 생성)
    void insertCart(Carts carts);

    // 장바구니 메뉴 1개 삭제
    void deleteToCart(long cartId);

    // 장바구니 상품 개수 가져오기
    Long getCartQuantityByOrderId (long orderId);

    // 장바구니 메뉴 데이터 가져오기
    CartItemDTO getCartInfoByCartId (long cartId);

    // 장바구니 주문자 기준 카트 데이터 가져오기
    List<CartItemDTO> getCartInfoByOrderId (long orderId);
}