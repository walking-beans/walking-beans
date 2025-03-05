package walking_beans.walking_beans_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/chattingroom", "/queue"); // /chattingroom : 모든 유저 && /queue : 특정 클라이언트
        registry.setApplicationDestinationPrefixes("/app"); // /app 경로로 메시지를 보내면 이 메시지는 @MessageMapping 어노테이션이 붙은 곳으로 향한다.
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")      // 커넷션을 맺는 경로 설정
                .setAllowedOriginPatterns("*")
                .withSockJS();                 // react 에서 SockJS 를 사용하기 위해
    }
}
