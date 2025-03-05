package walking_beans.walking_beans_backend.service.paymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.PaymentMapper;
import walking_beans.walking_beans_backend.model.dto.Payments;

@Service
public class PaymentServiceImpl implements PaymentService {
   @Autowired
   private PaymentMapper paymentMapper;

    // 결제 정보 저장하기 (최종 주문 저장할 때 id값 가져옴)
    @Override
    public void insertPayments(Payments payments) {
        paymentMapper.insertPayments(payments);
    }
}
