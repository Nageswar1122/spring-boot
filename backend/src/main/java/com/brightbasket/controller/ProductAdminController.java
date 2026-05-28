package com.brightbasket.controller;

import com.brightbasket.dto.ProductRequestDTO;
import com.brightbasket.dto.ProductResponseDTO;
import com.brightbasket.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin("*")
public class ProductAdminController {

    private final ProductService productService;

    public ProductAdminController(ProductService productService) {
        this.productService = productService;
    }

    // 🔹 CREATE PRODUCT (ADMIN)
    @PostMapping
    public ResponseEntity<ProductResponseDTO> create(
            @Valid @RequestBody ProductRequestDTO dto) {

        ProductResponseDTO response = productService.create(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 🔹 GET ALL PRODUCTS (ADMIN)
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAll() {
        return ResponseEntity.ok(productService.getAll());
    }

    // 🔹 GET PRODUCT BY ID (ADMIN)
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    // 🔹 UPDATE PRODUCT (ADMIN)
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDTO dto) {

        return ResponseEntity.ok(productService.update(id, dto));
    }

    // 🔹 DELETE PRODUCT (ADMIN)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
