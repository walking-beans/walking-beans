package walking_beans.walking_beans_backend.service.socialLoginService;

import java.util.Map;

public interface SocialLoginService {
    Map<String, Object> handleCallback(String code);
}
