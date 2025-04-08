package walking_beans.walking_beans_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileStorageService {
    @Value("${upload-img}") // application.properties에서 경로 설정
    private String uploadDir;

    public String saveFile(MultipartFile file) {
        System.out.println("uploadDir: " + uploadDir); // 디버깅
        if (file == null || file.isEmpty()) {
            System.out.println("서비스 - 파일이 null이거나 비어 있음");
            return null; // 파일 없으면 null 반환
        }

        // 고유 파일명 생성
        String originalFileName = file.getOriginalFilename();
        String uniqueFileName = UUID.randomUUID() + "_" + originalFileName;
        String filePath = uploadDir + uniqueFileName;
        System.out.println("서비스 - 저장 경로: " + filePath); // 디버깅

        try {
            File desk = new File(filePath);
            desk.getParentFile().mkdirs(); // 디렉토리 없으면 생성
            file.transferTo(desk); // 파일 저장
            return "/upload/" + uniqueFileName; // 저장된 경로 반환
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패: " + e.getMessage(), e);
        }
    }
}
