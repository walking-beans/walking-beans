package walking_beans.walking_beans_backend.service.addressService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.AddressMapper;
import walking_beans.walking_beans_backend.model.dto.Address;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressMapper addressMapper;

    // 주소 조회
    @Override
    public List<Address> getAllAddresses() {
        return addressMapper.getAllAddresses();
    }

    // 주소 추가
    @Override
    public void insertAddress(Address address) {
        addressMapper.insertAddress(address);
    }

    // 주소 특정 아이디로 검색하기
    @Override
    public List<Address> getAddressByUserId(Long userId) {
        return addressMapper.getAddressByUserId(userId);
    }
    
    // 대표 주소 설정
    @Override
    public Address getPrimaryAddressByUserId(Long userId) {
        return addressMapper.getPrimaryAddressByUserId(userId);
    }

    @Override
    public void updatePrimaryAddress(long userId, long addressId) {
        addressMapper.updatePrimaryAddress(userId, addressId);
    }

    // 대표주소 변경
    @Override
    public Address getUserMainAddress(long orderId, long userId) {
        return addressMapper.getUserMainAddress(orderId, userId);
    }
}
