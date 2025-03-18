package walking_beans.walking_beans_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    // config.properties 에 작성한 파일 저장 경로 설정
    @Value("${upload-img}")
    private String uploadPath;


    // 이미지를 처리할 때 1. static 폴더 아래 이미지
    //                    2. 업로드 폴더 위치 이미지 설정
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 이미지 위치가 여러 공간일 경우에는  각 위치별 페이크 위치를 사용해서 별칭 사용
        registry.addResourceHandler("/images/**") // 이미지 불러오는 경로
                .addResourceLocations("classpath:/static/images/"); // 저장하는 경로

        registry.addResourceHandler("/upload/**").
                addResourceLocations("file:"+ uploadPath);
    }
}
