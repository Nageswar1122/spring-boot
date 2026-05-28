package com.brightbasket.controller;

import com.brightbasket.dto.CartSummaryDTO;
import com.brightbasket.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

    // ========== GET CART SUMMARY ==========
    @GetMapping("/{userId}/summary")
    public ResponseEntity<CartSummaryDTO> getSummary(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getSummary(userId));
    }

    // ========== ADD TO CART ==========
    @PostMapping("/{userId}/add/{productId}")
    public ResponseEntity<Void> addToCart(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestParam int quantity) {
        try {
            cartService.addToCart(userId, productId, quantity);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // ========== UPDATE QUANTITY ==========
    @PutMapping("/update/{userId}/{productId}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestParam int qty) {
        cartService.updateQuantity(userId, productId, qty);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public void removeItem(
            @PathVariable Long userId,
            @PathVariable Long productId) {
        cartService.updateQuantity(userId, productId, 0);
    }

    // ========== CLEAR CART ==========
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok("Cart cleared successfully");
    }

}
