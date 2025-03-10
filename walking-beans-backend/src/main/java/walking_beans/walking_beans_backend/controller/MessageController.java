package walking_beans.walking_beans_backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import walking_beans.walking_beans_backend.model.dto.Message;
import walking_beans.walking_beans_backend.service.messageService.MessageServiceImpl;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageServiceImpl messageService;

    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping
    public void message(Message message) throws Exception {
        if (Message.MessageType.JOIN.equals(message.getType()))
        { message.setMessageContent(message.getUserId() + "님이 입장하셨습니다.");}
        messageService.insertMessageByRoomId(message);//메시지를 받을때마다 데이터베이스에 저장
        if(Message.MessageType.IMG.equals(message.getType())){
            //이미지인 경우 처리할 로직
        }
        messagingTemplate.convertAndSend("/sub/Chat/room/" + message.getRoomId(), message);

    }



}
