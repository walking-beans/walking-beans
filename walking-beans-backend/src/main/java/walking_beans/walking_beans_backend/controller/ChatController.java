package walking_beans.walking_beans_backend.controller;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import walking_beans.walking_beans_backend.model.dto.ChatMessage;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.chatService.ChatServiceImpl;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    @Autowired
    private ChatServiceImpl chatService;

    /** WebSocketChattingTest
     */
    @GetMapping("/api/chatTEST")
    public ResponseEntity<List<ChatMessage>> chatPage() {
        List<ChatMessage> messages = chatService.getMessages();
        return ResponseEntity.ok(messages);
    }
}
