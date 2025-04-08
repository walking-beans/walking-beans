package walking_beans.walking_beans_backend.service.tossPaymentService;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.model.dto.Payments;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;

public interface TossPaymentService {

    // 결제 정보 저장
    void insertPayments(Payments payments);

    // 결제 정보 조회
    Payments getPaymentByOrderId(long orderId);

}