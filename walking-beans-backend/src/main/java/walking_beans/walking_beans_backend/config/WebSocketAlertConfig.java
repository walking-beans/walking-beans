package walking_beans.walking_beans_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketAlertConfig implements WebSocketConfigurer {

    private final WebSocketChatHandler chatHandler;
    private final WebSocketAlertHandler alertHandler;

    public WebSocketAlertConfig(WebSocketChatHandler chatHandler, WebSocketAlertHandler alertHandler) {
        this.chatHandler = chatHandler;
        this.alertHandler = alertHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler, "/ws/chat").setAllowedOrigins("*");
        registry.addHandler(alertHandler, "/ws/alert").setAllowedOrigins("*");
    }
}
