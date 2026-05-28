package com.brightbasket.service;

import com.brightbasket.dto.AddressRequestDTO;
import com.brightbasket.model.Address;
import com.brightbasket.model.User;
import com.brightbasket.repository.AddressRepository;
import com.brightbasket.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public AddressService(UserRepository userRepository, AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    public Address updateAddress(Long userId, AddressRequestDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = user.getAddress();

        if (address == null) {
            address = new Address();
            address.setUser(user);
        }

        address.setStreet(dto.getStreet());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setZipCode(dto.getZipCode());
        address.setCountry(dto.getCountry());

        Address saved = addressRepository.save(address);
        user.setAddress(saved); // make sure user entity has updated address
        userRepository.save(user);

        return saved;
    }
}
