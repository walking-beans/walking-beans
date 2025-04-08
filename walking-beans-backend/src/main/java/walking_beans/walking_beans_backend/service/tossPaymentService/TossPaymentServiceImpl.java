package walking_beans.walking_beans_backend.service.tossPaymentService;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.PaymentMapper;
import walking_beans.walking_beans_backend.model.dto.Payments;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class TossPaymentServiceImpl implements TossPaymentService {
    //toss API 실행
    private static final String WIDGET_SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
    private static final String API_SECRET_KEY = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, String> billingKeyMap = new HashMap<>();

    public Map<String, Object> confirmPayment(Map<String, Object> requestData, boolean isApiPayment) throws IOException {
        String secretKey = isApiPayment ? API_SECRET_KEY : WIDGET_SECRET_KEY;
        String url = "https://api.tosspayments.com/v1/payments/confirm";
        return sendRequest(requestData, secretKey, url);
    }

    public Map<String, Object> confirmBilling(Map<String, Object> requestData) throws IOException {
        String billingKey = billingKeyMap.get(requestData.get("customerKey"));
        String url = "https://api.tosspayments.com/v1/billing/" + billingKey;
        return sendRequest(requestData, API_SECRET_KEY, url);
    }

    public Map<String, Object> issueBillingKey(Map<String, Object> requestData) throws IOException {
        String url = "https://api.tosspayments.com/v1/billing/authorizations/issue";
        Map<String, Object> response = sendRequest(requestData, API_SECRET_KEY, url);

        if (!response.containsKey("error")) {
            billingKeyMap.put(requestData.get("customerKey").toString(), response.get("billingKey").toString());
        }

        return response;
    }

    public Map<String, Object> callbackAuth(String customerKey, String code) throws IOException {
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("grantType", "AuthorizationCode");
        requestData.put("customerKey", customerKey);
        requestData.put("code", code);

        String url = "https://api.tosspayments.com/v1/brandpay/authorizations/access-token";
        return sendRequest(requestData, API_SECRET_KEY, url);
    }

    public Map<String, Object> confirmBrandpay(Map<String, Object> requestData) throws IOException {
        String url = "https://api.tosspayments.com/v1/brandpay/payments/confirm";
        return sendRequest(requestData, API_SECRET_KEY, url);
    }

    private Map<String, Object> sendRequest(Map<String, Object> requestData, String secretKey, String urlString) throws IOException {
        HttpURLConnection connection = createConnection(secretKey, urlString);
        try (OutputStream os = connection.getOutputStream()) {
            os.write(objectMapper.writeValueAsBytes(requestData));
        }

        try (InputStream responseStream = connection.getResponseCode() == 200 ? connection.getInputStream() : connection.getErrorStream();
             Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8)) {
            return objectMapper.readValue(reader, Map.class);
        } catch (Exception e) {
            log.error("Error reading response", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error reading response");
            return errorResponse;
        }
    }

    private HttpURLConnection createConnection(String secretKey, String urlString) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Authorization", "Basic " + Base64.getEncoder().encodeToString((secretKey + ":").getBytes(StandardCharsets.UTF_8)));
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        return connection;
    }

    @Autowired
    private PaymentMapper paymentMapper;

    // 결제 정보 저장
    @Override
    public void insertPayments(Payments payments) {
        paymentMapper.insertPayments(payments);
    }

    // 결제 정보 조회
    @Override
    public Payments getPaymentByOrderId(long orderId) {
        return paymentMapper.getPaymentByOrderId(orderId);
    }
}
