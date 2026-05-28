package com.brightbasket.repository;

import com.brightbasket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // JpaRepository already provides count(), findAll(), save(), delete() etc
}
