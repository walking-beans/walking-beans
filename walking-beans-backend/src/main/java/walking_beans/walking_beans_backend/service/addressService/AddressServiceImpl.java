package walking_beans.walking_beans_backend.service.addressService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import walking_beans.walking_beans_backend.mapper.AddressMapper;
import walking_beans.walking_beans_backend.model.dto.Address;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    AddressMapper addressMapper;

    @Override
    public List<Address> getAllAddresses() {
        return addressMapper.getAllAddresses();
    }







    @Override
    public Address getUserMainAddress(long orderId, long userId) {
        return addressMapper.getUserMainAddress(orderId, userId);
    }
}
