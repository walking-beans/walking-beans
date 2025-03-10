package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.util.StringTokenizer;

@Slf4j
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryIncome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long incomeIndex;

    private long riderId;

    private long orderId;

    private String incomeDate;

    private int incomeAmount;

    public void changeDateFormat() {
        log.info("Change income date format");

        StringTokenizer st = new StringTokenizer(this.incomeDate, " ");

        String time = st.nextToken();

        String date = st.nextToken();

        if (date.equals("Monday")) {
            date = "(월)";
        } else if (date.equals("Tuesday")) {
            date = "(화)";
        } else if (date.equals("Wednesday")) {
            date = "(수)";
        } else if (date.equals("Thursday")) {
            date = "(목)";
        } else if (date.equals("Friday")) {
            date = "(금)";
        } else if (date.equals("Saturday")) {
            date = "(토)";
        } else if (date.equals("Sunday")) {
            date = "(일)";
        }

        time += " " + date;

        if (st.nextToken().equals("PM")) {
            time += " 오후";
        } else {
            time += " 오전";
        }
        time += " " + st.nextToken();
        log.info("Change income date format: " + time);
        this.setIncomeDate(time);
    }
}
