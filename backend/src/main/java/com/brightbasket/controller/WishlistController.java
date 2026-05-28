package com.brightbasket.controller;

import com.brightbasket.dto.WishlistItemDTO;
import com.brightbasket.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin("*")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WishlistItemDTO>> getWishlist(@PathVariable Long userId) {
        return ResponseEntity.ok(wishlistService.getWishlist(userId));
    }

    @PostMapping("/user/{userId}/add/{productId}")
    public ResponseEntity<List<WishlistItemDTO>> addToWishlist(@PathVariable Long userId,
            @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.addToWishlist(userId, productId));
    }

    @DeleteMapping("/user/{userId}/remove/{productId}")
    public ResponseEntity<List<WishlistItemDTO>> removeFromWishlist(@PathVariable Long userId,
            @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.removeFromWishlist(userId, productId));
    }

    @DeleteMapping("/user/{userId}/clear")
    public ResponseEntity<List<WishlistItemDTO>> clearWishlist(@PathVariable Long userId) {
        return ResponseEntity.ok(wishlistService.clearWishlist(userId));
    }
}
