package com.brightbasket.service;

import com.brightbasket.dto.AdminDashboardDTO;
import com.brightbasket.repository.OrderRepository;
import com.brightbasket.repository.ProductRepository;
import com.brightbasket.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public AdminDashboardService(OrderRepository orderRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public AdminDashboardDTO getDashboardStats() {
        AdminDashboardDTO dto = new AdminDashboardDTO();

        dto.setTotalRevenue(orderRepository.totalRevenue());
        dto.setTotalOrders(orderRepository.count());
        dto.setTotalProducts(productRepository.count());
        dto.setTotalUsers(userRepository.count());
        dto.setTotalSales(orderRepository.countByStatus("COMPLETED"));
        dto.setPendingOrders(orderRepository.countByStatus("PENDING"));
        dto.setRefunds(orderRepository.countByStatus("REFUNDED"));
        dto.setCancellations(orderRepository.countByStatus("CANCELLED"));

        return dto;
    }
}
