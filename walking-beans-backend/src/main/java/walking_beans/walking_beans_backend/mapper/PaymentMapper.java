package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.Payments;

@Mapper
public interface PaymentMapper {
    // 결제 정보 저장하기
    void insertPayments(Payments payments);

    // 결제 정보 조회
    Payments getPaymentByOrderId(long orderId);
}
