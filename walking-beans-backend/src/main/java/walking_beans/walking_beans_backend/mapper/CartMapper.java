package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;

@Mapper
public interface CartMapper {
    // 메뉴 정보 저장 (order랑 같이 생성)
    public Carts addToCart(Orders orders, Carts carts);

    // 메뉴 정보 삭제
}
