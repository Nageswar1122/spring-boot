package com.brightbasket.service;

import com.brightbasket.dto.OrderDTO;
import com.brightbasket.dto.OrderItemDTO;
import com.brightbasket.dto.ShippingAddressDTO;
import com.brightbasket.model.Order;
import com.brightbasket.model.OrderItem;
import com.brightbasket.model.Product;
import com.brightbasket.model.ShippingAddress;
import com.brightbasket.model.User;
import com.brightbasket.repository.OrderRepository;
import com.brightbasket.repository.ProductRepository;
import com.brightbasket.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    /* ================= CREATE ORDER ================= */
    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {

        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(orderDTO.getStatus() != null ? orderDTO.getStatus() : "pending");
        order.setTotalAmount(orderDTO.getTotalAmount());

        // ✅ SAVE PAYMENT METHOD
        order.setPaymentMethod(orderDTO.getPaymentMethod());

        // ✅ SAVE SHIPPING ADDRESS
        if (orderDTO.getShippingAddress() != null) {
            order.setShippingAddress(mapToEntity(orderDTO.getShippingAddress()));
        }

        List<OrderItem> orderItems = orderDTO.getItems().stream().map(dto -> {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(dto.getQuantity());
            item.setPrice(dto.getPrice());
            return item;
        }).collect(Collectors.toList());

        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        return mapToDTO(savedOrder);
    }

    /* ================= USER ORDERS ================= */
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUser(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /* ================= ADMIN: GET ALL ORDERS ================= */
    @Transactional(readOnly = true)
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /* ================= ADMIN: UPDATE STATUS ================= */
    @Transactional
    public void updateOrderStatus(Long orderId, String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status.toLowerCase());
        orderRepository.save(order);
    }

    /* ================= CANCEL ORDER ================= */
    @Transactional
    public void cancelOrder(Long orderId, Long userId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized cancellation");
        }

        if (!order.getStatus().equals("pending") &&
                !order.getStatus().equals("confirmed")) {
            throw new RuntimeException("Order cannot be cancelled");
        }

        order.setStatus("cancelled");
        orderRepository.save(order);
    }

    /* ================= MAPPERS ================= */
    private OrderDTO mapToDTO(Order order) {

        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());

        // ✅ RETURN PAYMENT METHOD
        dto.setPaymentMethod(order.getPaymentMethod());

        // ✅ RETURN SHIPPING ADDRESS
        if (order.getShippingAddress() != null) {
            dto.setShippingAddress(mapToDTO(order.getShippingAddress()));
        }

        dto.setItems(
                order.getItems()
                        .stream()
                        .map(this::mapItemToDTO)
                        .collect(Collectors.toList()));

        return dto;
    }

    private OrderItemDTO mapItemToDTO(OrderItem item) {

        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setName(item.getProduct().getName());
        dto.setBrand(item.getProduct().getBrand());
        dto.setImage(item.getProduct().getImage());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());

        return dto;
    }

    /* ================= SHIPPING ADDRESS MAPPERS ================= */
    private ShippingAddress mapToEntity(ShippingAddressDTO dto) {

        ShippingAddress address = new ShippingAddress();
        address.setFullName(dto.getFullName());
        address.setPhone(dto.getPhone());
        address.setStreet(dto.getStreet());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setZipCode(dto.getZipCode());
        address.setCountry(dto.getCountry());
        return address;
    }

    private ShippingAddressDTO mapToDTO(ShippingAddress address) {

        ShippingAddressDTO dto = new ShippingAddressDTO();
        dto.setFullName(address.getFullName());
        dto.setPhone(address.getPhone());
        dto.setStreet(address.getStreet());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setZipCode(address.getZipCode());
        dto.setCountry(address.getCountry());
        return dto;
    }
}
