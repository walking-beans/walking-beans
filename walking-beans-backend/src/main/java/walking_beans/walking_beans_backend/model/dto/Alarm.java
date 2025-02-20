package walking_beans.walking_beans_backend.model.dto;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Alarm {

    /*
    `alarm_id`	bigint(20) NOT NULL AUTO_INCREMENT,
	`user_id`	bigint(20)	NOT NULL, -- '수신인'
	`alarm_content`	varchar(255) NOT NULL,
	`alarm_status`	boolean	NOT NULL, -- 읽지 않음 = false, 읽음 = true
	`alarm_create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`alarm_sender_id` varchar(255) NOT NULL, -- '발신인'
	`alarm_role` TINYINT NOT NULL, -- 1=알림, 2=채팅
	  PRIMARY KEY (`alarm_id`),
     */
}
