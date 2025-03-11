package walking_beans.walking_beans_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketChattingTESTConfig implements WebSocketConfigurer {

    private final WebSocketChattingTESTHandler chattingHandler;

    public WebSocketChattingTESTConfig(WebSocketChattingTESTHandler chattingHandler) {
        this.chattingHandler = chattingHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chattingHandler, "/ws/chatTEST") // ✅ WebSocket 경로 api에 맞게 수정바람
                .setAllowedOrigins("*");
    }
}
