package com.brightbasket.repository;

import com.brightbasket.model.Wishlist;
import com.brightbasket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUser(User user);

    void deleteByUserAndProductId(User user, Long productId);

    void deleteByUser(User user);
}
