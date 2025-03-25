package walking_beans.walking_beans_backend.model.dto;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.StringTokenizer;

@Slf4j
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId;

    private long userId;
    private long storeId;
    private long addressId;

    @Column(unique = true)
    private String orderNumber;

    private int orderStatus;
    private String orderRequests;
    private int orderTotalPrice;

    private String orderCreateDate;

    private String orderModifiedDate;
    private String RiderIdOnDuty;

    public void changeCreateDateFormat() {
        log.info("Change income date format");

        StringTokenizer st = new StringTokenizer(this.orderCreateDate, " ");

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
        this.setOrderCreateDate(time);
    }

    public void changeModifiedDateFormat() {
        log.info("Change income date format");

        StringTokenizer st = new StringTokenizer(this.orderModifiedDate, " ");

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
        this.setOrderModifiedDate(time);
    }
}
