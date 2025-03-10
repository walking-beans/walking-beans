package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.Address;

import java.util.List;

@Mapper
public interface AddressMapper {
    // 모든 주소 조회
    List<Address> getAllAddresses();

    // 주소 추가 하기
    void insertAddress(Address address);

    // 주소 검색하기
    List<Address> getAddressByUserId(Long userId);

    // 대표 주소 설정하기
    Address getPrimaryAddressByUserId(Long userId);

    // 대표 주소 변경
    void updatePrimaryAddress(long userId, long addressId);
    /********** LEO **********/
    // 유저 대표 주소 가져오기 by order_id
    Address getUserMainAddress(long orderId, long userId);
}
