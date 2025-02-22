package walking_beans.walking_beans_backend.service.AddressService;

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
}
