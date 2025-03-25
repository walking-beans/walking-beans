package walking_beans.walking_beans_backend.model.dto.rider;

import lombok.*;
import lombok.extern.flogger.Flogger;
import lombok.extern.slf4j.Slf4j;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.StringTokenizer;

@Slf4j
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RiderOrderStatusDTO {

    private int orderStatus;

    private LocalDateTime orderModifiedDate;

    private short storeMaxDeliveryTime;

    private int timeRemaining;

    private String deliveryDeadline;

    public boolean definingTimeRemaining() {
        LocalDateTime now = LocalDateTime.now();

        log.info("=== {} ===", orderModifiedDate.plusMinutes(storeMaxDeliveryTime));

        if (now.isAfter(orderModifiedDate.plusMinutes(storeMaxDeliveryTime))) {
            log.info("지남");
            timeRemaining = 0;
            deliveryDeadline = null;
            return false;
        } else {
            Duration duration = Duration.between(orderModifiedDate, now);
            log.info("안지남 {} ", duration.toMinutes());
            timeRemaining = (int) (storeMaxDeliveryTime - duration.toMinutes());
            return true;
        }
    }

    public void definingDeliveryDeadline() {
        LocalDateTime deadLine = orderModifiedDate.plusMinutes(storeMaxDeliveryTime);

        if (deadLine.getHour() > 12) {
            this.deliveryDeadline = "오후 " + (deadLine.getHour() - 12) + ":";
        } else {
           this.deliveryDeadline = "오전 " + deadLine.getHour() + ":";
        }

        if (deadLine.getMinute() == 0) {
            this.deliveryDeadline += "00";
        } else if (deadLine.getMinute() < 10) {
            this.deliveryDeadline += "0" + deadLine.getMinute();
        } else {
            this.deliveryDeadline += deadLine.getMinute();
        }
    }

}
