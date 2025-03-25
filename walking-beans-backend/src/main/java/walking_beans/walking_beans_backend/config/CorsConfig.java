package walking_beans.walking_beans_backend.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                                "http://1.221.88.20:3000",  // 외부 IP
                                "http://192.168.0.6:3000", // 내부 IP
                                "http://localhost:3000",    // 로컬 개발 환경
                                "https://1.221.88.20:3000",  // 외부 IP
                                "https://192.168.0.6:3000", // 내부 IP
                                "https://localhost:3000"    // 로컬 개발 환경
                        )
                        .allowCredentials(true)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                        .allowedHeaders("*");
            }
        };
    }
}
