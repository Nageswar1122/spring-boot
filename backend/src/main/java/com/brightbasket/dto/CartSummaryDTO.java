package com.brightbasket.dto;

import com.brightbasket.model.CartItem;
import java.util.List;

public class CartSummaryDTO {

    private List<CartItem> items;
    private double total;

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}
