package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;

@Mapper
public interface CartMapper {
    // 메뉴 정보 저장 (order랑 같이 생성)
    void insertCart(Carts cart);

    // 장바구니 메뉴 1개 삭제
    Carts deleteToCart(long cartId);
}
