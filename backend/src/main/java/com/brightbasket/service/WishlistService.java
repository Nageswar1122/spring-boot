package com.brightbasket.service;

import com.brightbasket.dto.WishlistItemDTO;
import com.brightbasket.model.Product;
import com.brightbasket.model.User;
import com.brightbasket.model.Wishlist;
import com.brightbasket.repository.ProductRepository;
import com.brightbasket.repository.UserRepository;
import com.brightbasket.repository.WishlistRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    /* ================= GET WISHLIST ================= */
    public List<WishlistItemDTO> getWishlist(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return wishlistRepository.findByUser(user).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /* ================= ADD TO WISHLIST ================= */
    public List<WishlistItemDTO> addToWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Avoid duplicates
        boolean exists = wishlistRepository.findByUser(user).stream()
                .anyMatch(w -> w.getProduct().getId().equals(productId));
        if (!exists) {
            Wishlist item = new Wishlist();
            item.setUser(user);
            item.setProduct(product);
            item.setAddedAt(LocalDateTime.now());
            wishlistRepository.save(item);
        }

        // Return updated wishlist
        return getWishlist(userId);
    }

    /* ================= REMOVE ITEM ================= */
    @Transactional
    public List<WishlistItemDTO> removeFromWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        wishlistRepository.findByUser(user).stream()
                .filter(w -> w.getProduct().getId().equals(productId))
                .findFirst()
                .ifPresent(wishlistRepository::delete);

        return getWishlist(userId);
    }

    /* ================= CLEAR WISHLIST ================= */
    @Transactional
    public List<WishlistItemDTO> clearWishlist(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Wishlist> items = wishlistRepository.findByUser(user);
        if (!items.isEmpty()) {
            wishlistRepository.deleteAll(items);
        }

        return getWishlist(userId);
    }

    /* ================= MAP TO DTO ================= */
    private WishlistItemDTO mapToDTO(Wishlist item) {
        WishlistItemDTO dto = new WishlistItemDTO();
        Product product = item.getProduct();
        dto.setProductId(product.getId());
        dto.setName(product.getName());
        dto.setBrand(product.getBrand());
        dto.setImage(product.getImage());
        dto.setPrice(product.getPrice() != null ? product.getPrice() : 0.0);
        dto.setOriginalPrice(product.getOriginalPrice() != null ? product.getOriginalPrice() : 0.0);
        dto.setRating(product.getRating() != null ? product.getRating() : 0.0);
        return dto;
    }
}
