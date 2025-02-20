package walking_beans.walking_beans_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import walking_beans.walking_beans_backend.model.dto.Address;

import java.util.List;

@Mapper
public interface AddressMapper {
    // 모든 주소 조회
    List<Address> getAllAddresses();
}
