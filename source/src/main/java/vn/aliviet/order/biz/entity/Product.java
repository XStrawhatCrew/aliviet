package vn.aliviet.order.biz.entity;

import vn.aliviet.order.model.BaseEntity;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

/**
 * Created by windluffy on 29/02/2016.
 */

@Entity
@Table(name = "tbl_product")
public class Product extends BaseEntity {
    @Column(length = 1000)
    private String linkSource;
    private String productName;
    private String shopName;

    @Column(length = 1000)
    private String color;

    private String size;
    private String packageName;

    @Column(length = 1000)
    private String featureImage;
    private double price;
    private int quantity;

    @Column(length = 1000)
    private String notes;

    @Column(length = 5000)
    private String crwColors;
    @Column(length = 5000)
    private String crwSizes;
    @Column(length = 5000)
    private String crwPackages;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    public Product() {
        super(UUID.randomUUID());
    }

    public String getCrwColors() {
        return crwColors;
    }

    public void setCrwColors(String crwColors) {
        this.crwColors = crwColors;
    }

    public String getCrwSizes() {
        return crwSizes;
    }

    public void setCrwSizes(String crwSizes) {
        this.crwSizes = crwSizes;
    }

    public String getCrwPackages() {
        return crwPackages;
    }

    public void setCrwPackages(String crwPackages) {
        this.crwPackages = crwPackages;
    }

    public String getLinkSource() {
        return linkSource;
    }

    public void setLinkSource(String linkSource) {
        this.linkSource = linkSource;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getFeatureImage() {
        return featureImage;
    }

    public void setFeatureImage(String featureImage) {
        this.featureImage = featureImage;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object obj) {
        boolean response = false;

        if (obj == null) {
            response = false;
        } else if (!(obj instanceof Product)) {
            response = false;
        } else {
            if (((Product) obj).getUuid().equals(this.getUuid())) {
                response = true;
            }
        }

        return response;
    }

    @Override
    public int hashCode() {
        return this.getUuid().hashCode();
    }

}
