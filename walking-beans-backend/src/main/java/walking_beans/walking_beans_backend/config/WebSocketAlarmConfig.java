package walking_beans.walking_beans_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketAlarmConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-alarm")
                .setAllowedOrigins(
                        "http://1.221.88.20:3000",  // 외부 IP
                        "http://192.168.0.6:3000", // 내부 IP
                        "http://localhost:3000",    // 로컬 개발 환경
                        "https://1.221.88.20:3000",  // 외부 IP
                        "https://192.168.0.6:3000", // 내부 IP
                        "https://localhost:3000" );

        registry.addEndpoint("/ws-alarm")
                .setAllowedOrigins(
                        "http://1.221.88.20:3000",  // 외부 IP
                        "http://192.168.0.6:3000", // 내부 IP
                        "http://localhost:3000",    // 로컬 개발 환경
                        "https://1.221.88.20:3000",  // 외부 IP
                        "https://192.168.0.6:3000", // 내부 IP
                        "https://localhost:3000"
                )
                .withSockJS();
        registry.addEndpoint("/ws") // 연결될 엔드포인트
                .setAllowedOrigins("*");
    }
}
