package com.brightbasket.controller;

import com.brightbasket.dto.AddressRequestDTO;
import com.brightbasket.model.Address;
import com.brightbasket.service.AddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
@CrossOrigin("*")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PutMapping
    public ResponseEntity<Address> updateAddress(
            @RequestParam Long userId,
            @RequestBody AddressRequestDTO dto) {

        Address updatedAddress = addressService.updateAddress(userId, dto);
        return ResponseEntity.ok(updatedAddress);
    }
}
