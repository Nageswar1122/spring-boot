package com.brightbasket.service;

import com.brightbasket.dto.CartSummaryDTO;
import com.brightbasket.model.Cart;
import com.brightbasket.model.CartItem;
import com.brightbasket.model.Product;
import com.brightbasket.model.User;
import com.brightbasket.repository.CartItemRepository;
import com.brightbasket.repository.CartRepository;
import com.brightbasket.repository.ProductRepository;
import com.brightbasket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // ================= GET CART SUMMARY =================
    public CartSummaryDTO getSummary(Long userId) {
        Cart cart = getOrCreateCart(userId);

        List<CartItem> items = cartItemRepository.findByCart(cart);
        if (items == null)
            items = new ArrayList<>();

        double total = items.stream()
                .mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity())
                .sum();

        CartSummaryDTO dto = new CartSummaryDTO();
        dto.setItems(items);
        dto.setTotal(total);
        return dto;
    }

    // ================= ADD TO CART =================
    public void addToCart(Long userId, Long productId, int qty) {
        Cart cart = getOrCreateCart(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .orElse(null);

        if (item == null) {
            item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(qty);
        } else {
            item.setQuantity(item.getQuantity() + qty);
        }

        cartItemRepository.save(item);
    }

    // ================= UPDATE QUANTITY =================
    public void updateQuantity(Long userId, Long productId, int qty) {
        Cart cart = getOrCreateCart(userId);

        CartItem item = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (qty <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(qty);
            cartItemRepository.save(item);
        }
    }

    // ================= CLEAR CART =================
    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        List<CartItem> items = cartItemRepository.findByCart(cart);
        if (items != null && !items.isEmpty()) {
            cartItemRepository.deleteAll(items);
        }
    }

    // ================= GET OR CREATE CART =================
    private Cart getOrCreateCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }
}
