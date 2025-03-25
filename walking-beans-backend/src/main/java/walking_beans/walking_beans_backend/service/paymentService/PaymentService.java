package walking_beans.walking_beans_backend.service.paymentService;

import walking_beans.walking_beans_backend.model.dto.Payments;

public interface PaymentService {
    // 결제 정보 저장하기
    void insertPayments(Payments payments);
}
