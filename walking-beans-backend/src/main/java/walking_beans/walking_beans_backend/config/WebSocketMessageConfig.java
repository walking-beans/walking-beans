/*
package walking_beans.walking_beans_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketMessageConfig implements WebSocketConfigurer {

    private final WebSocketMessageHandler chattingHandler;

    public WebSocketMessageConfig(WebSocketMessageHandler chattingHandler) {
        this.chattingHandler = chattingHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chattingHandler, "/ws/chatting") // ✅ WebSocket 경로 api에 맞게 수정바람
                .setAllowedOrigins("*");
    }
}
*/
