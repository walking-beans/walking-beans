package walking_beans.walking_beans_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.ChattingInfoDTO;
import walking_beans.walking_beans_backend.service.chattingInfoService.ChattingInfoServiceImpl;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/chattinginfo")
public class ChattingInfoController {

    @Autowired
    private ChattingInfoServiceImpl chattingInfoService;

    @GetMapping("/map")
    public ResponseEntity<Map<Integer, List<ChattingInfoDTO>>> getChattingInfoBySenderId(@RequestParam("senderId") long senderId) {
        log.info("======== /api/chattinginfo/map?senderId={}", senderId);

        return ResponseEntity.ok(chattingInfoService.getChattingInfoBySenderId(senderId));
    }

}
