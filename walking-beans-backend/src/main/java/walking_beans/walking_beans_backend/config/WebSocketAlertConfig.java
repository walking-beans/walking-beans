package walking_beans.walking_beans_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketAlertConfig implements WebSocketConfigurer {

    private final WebSocketChatAlertHandler chatHandler;
    private final WebSocketAlertHandler alertHandler;
    private final WebSocketHandlerOrder webSocketHandler;

    public WebSocketAlertConfig(WebSocketChatAlertHandler chatHandler, WebSocketAlertHandler alertHandler, WebSocketHandlerOrder webSocketHandler) {
        this.chatHandler = chatHandler;
        this.alertHandler = alertHandler;
        this.webSocketHandler = webSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler, "/ws/chat").setAllowedOrigins("*");
        registry.addHandler(alertHandler, "/ws/alert").setAllowedOrigins("*");
        registry.addHandler(webSocketHandler, "/ws/orders").setAllowedOrigins("*");
    }





}
