package com.brightbasket.dto;

public class CategoryDTO {

    private Long categoryid;
    private String name;
    private String icon;
    private Long productCount;

    public CategoryDTO() {
    }

    public CategoryDTO(Long categoryid, String name, String icon, Long productCount) {
        this.categoryid = categoryid;
        this.name = name;
        this.icon = icon;
        this.productCount = productCount;
    }

    public Long getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(Long categoryid) {
        this.categoryid = categoryid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Long getProductCount() {
        return productCount;
    }

    public void setProductCount(Long productCount) {
        this.productCount = productCount;
    }
}
