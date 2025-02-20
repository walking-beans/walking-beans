package walking_beans.walking_beans_backend.service.CartService;

import walking_beans.walking_beans_backend.model.dto.Carts;
import walking_beans.walking_beans_backend.model.dto.Orders;

public interface CartService {
    // 메뉴 정보 저장 (order랑 같이 생성)
    Carts addToCart(Orders orders, Carts carts);
}
