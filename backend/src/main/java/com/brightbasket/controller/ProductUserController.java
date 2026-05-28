package com.brightbasket.controller;

import com.brightbasket.dto.ProductResponseDTO;
import com.brightbasket.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductUserController {

    private final ProductService productService;

    public ProductUserController(ProductService productService) {
        this.productService = productService;
    }

    // 🔹 GET ALL PRODUCTS (USER)
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAll());
    }

    // 🔹 GET PRODUCT BY ID (USER)
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        ProductResponseDTO product = productService.getById(id);
        if (product == null) {
            return ResponseEntity.notFound().build(); // Returns 404 if product not found
        }
        return ResponseEntity.ok(product);
    }
}
