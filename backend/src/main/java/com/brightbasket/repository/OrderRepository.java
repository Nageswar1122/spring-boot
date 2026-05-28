package com.brightbasket.repository;

import com.brightbasket.model.Order;
import com.brightbasket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // ✅ Total Orders
    @Query("SELECT COUNT(o) FROM Order o")
    long countTotalOrders();

    // ✅ Total Revenue
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    Double totalRevenue();

    // ✅ Count By Status
    long countByStatus(String status);

    // ✅ Orders By User
    List<Order> findByUser(User user);
}
