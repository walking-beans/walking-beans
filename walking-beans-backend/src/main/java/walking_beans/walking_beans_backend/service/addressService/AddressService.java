package walking_beans.walking_beans_backend.service.addressService;

import walking_beans.walking_beans_backend.model.dto.Address;

import java.util.List;

public interface AddressService {

    // 모든 주소 조회
    List<Address> getAllAddresses();



    /********** LEO **********/
    // 유저 대표 주소 가져오기 by order_id
    Address getUserMainAddress(long orderId, long userId);
}
