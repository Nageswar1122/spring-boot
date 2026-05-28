package com.brightbasket.dto;

public class AdminDashboardDTO {

    private Double totalRevenue;
    private Long totalOrders;
    private Long totalProducts;
    private Long totalUsers;
    private Long totalSales;
    private Long pendingOrders;
    private Long refunds;
    private Long cancellations;

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(Long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Long getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Long totalSales) {
        this.totalSales = totalSales;
    }

    public Long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(Long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public Long getRefunds() {
        return refunds;
    }

    public void setRefunds(Long refunds) {
        this.refunds = refunds;
    }

    public Long getCancellations() {
        return cancellations;
    }

    public void setCancellations(Long cancellations) {
        this.cancellations = cancellations;
    }
}
