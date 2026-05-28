package com.brightbasket.repository;

import com.brightbasket.model.Cart;
import com.brightbasket.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart(Cart cart);

    Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);
}
