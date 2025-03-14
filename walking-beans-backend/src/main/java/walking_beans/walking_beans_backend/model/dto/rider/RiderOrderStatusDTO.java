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

    public void definingTimeRemaining() {
        /*StringTokenizer st = new StringTokenizer(this.orderModifiedDate, " ");
        String s = LocalDate.now().toString();
        String date = st.nextToken();
        int difference = 0;

        log.info("----- s : {}, time : {} -----", s, date);
        if (!date.equals(s)) {
            log.info("하루 경과됌");
            difference = 1;
        }

        StringTokenizer timeST = new StringTokenizer(st.nextToken(), ":");
        LocalTime time = LocalTime.now();
        int currentHour = time.getHour();
        int currentMinute = time.getMinute();

        int orderHour = Integer.parseInt(timeST.nextToken());
        int orderMinute = Integer.parseInt(timeST.nextToken());

        log.info("ch : {}, cm : {}, oh : {}, om : {} ", currentHour, currentMinute, orderHour, orderMinute);*/

        LocalDateTime now = LocalDateTime.now();

        log.info("=== {} ===", orderModifiedDate.plusMinutes(storeMaxDeliveryTime));

        if (now.isAfter(orderModifiedDate)) {
            Duration duration = Duration.between(orderModifiedDate, now);
            log.info("안지남 {} ", duration.toMinutes());
            timeRemaining = (int) duration.toMinutes();
        } else {
            log.info("지남");
            timeRemaining = 0;
        }
    }

}
