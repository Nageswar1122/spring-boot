package com.brightbasket.service;

import com.brightbasket.dto.ProductRequestDTO;
import com.brightbasket.dto.ProductResponseDTO;
import com.brightbasket.exception.BadRequestException;
import com.brightbasket.exception.ResourceNotFoundException;
import com.brightbasket.model.Product;
import com.brightbasket.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ✅ CREATE PRODUCT
    public ProductResponseDTO create(ProductRequestDTO dto) {

        if (dto.getOriginalPrice() == null) {
            dto.setOriginalPrice(dto.getPrice());
        }

        if (dto.getPrice() > dto.getOriginalPrice()) {
            throw new BadRequestException("Price cannot be greater than original price");
        }

        Product product = new Product();
        setProductFields(product, dto);

        product.setRating(dto.getRating() == null ? 0.0 : dto.getRating());
        product.setReviewCount(dto.getReviewCount() == null ? 0 : dto.getReviewCount());

        return mapToResponse(productRepository.save(product));
    }

    // ✅ GET PRODUCT BY ID
    public ProductResponseDTO getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

        return mapToResponse(product);
    }

    // ✅ GET ALL PRODUCTS
    public List<ProductResponseDTO> getAll() {

        List<ProductResponseDTO> list = new ArrayList<>();

        for (Product product : productRepository.findAll()) {
            list.add(mapToResponse(product));
        }

        return list;
    }

    // ✅ UPDATE PRODUCT
    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

        if (dto.getOriginalPrice() == null) {
            dto.setOriginalPrice(dto.getPrice());
        }

        if (dto.getPrice() > dto.getOriginalPrice()) {
            throw new BadRequestException("Price cannot be greater than original price");
        }

        setProductFields(product, dto);

        product.setRating(dto.getRating() == null ? product.getRating() : dto.getRating());
        product.setReviewCount(dto.getReviewCount() == null ? product.getReviewCount() : dto.getReviewCount());

        return mapToResponse(productRepository.save(product));
    }

    // ✅ DELETE PRODUCT
    public void delete(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

        productRepository.delete(product);
    }

    // ✅ COMMON FIELD SETTER
    private void setProductFields(Product product, ProductRequestDTO dto) {
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setOriginalPrice(dto.getOriginalPrice());
        product.setStock(dto.getStock());
        product.setCategory(dto.getCategory()); // ✅ STRING
        product.setBrand(dto.getBrand());
        product.setImage(dto.getImage());
        product.setImages(dto.getImages());
        product.setFeatures(dto.getFeatures());
        product.setSellerId(dto.getSellerId());
    }

    // ✅ ENTITY → DTO
    private ProductResponseDTO mapToResponse(Product product) {

        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setOriginalPrice(product.getOriginalPrice());
        dto.setStock(product.getStock());
        dto.setCategory(product.getCategory());
        dto.setBrand(product.getBrand());
        dto.setImage(product.getImage());
        dto.setImages(product.getImages());
        dto.setFeatures(product.getFeatures());
        dto.setSellerId(product.getSellerId());
        dto.setRating(product.getRating());
        dto.setReviewCount(product.getReviewCount());

        return dto;
    }
}
