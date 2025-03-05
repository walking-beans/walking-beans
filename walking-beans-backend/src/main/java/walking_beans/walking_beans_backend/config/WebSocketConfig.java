package walking_beans.walking_beans_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;import org.springframework.web.socket.config.annotation.*;
import walking_beans.walking_beans_backend.model.vo.admin.WebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler chatHandler;

    public WebSocketConfig(WebSocketHandler chatHandler) {
        this.chatHandler = chatHandler;
    }


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry
                .addHandler(chatHandler, "/room")
                .setAllowedOriginPatterns("*");
    }

}
