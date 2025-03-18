package walking_beans.walking_beans_backend.service;

import walking_beans.walking_beans_backend.model.dto.CartOrderRequestDTO;
import walking_beans.walking_beans_backend.model.dto.CartOrderResponseDTO;

public interface CartOrderService {
    CartOrderResponseDTO addToCart(CartOrderRequestDTO requestDTO);
}