package vn.aliviet.order.biz.entity;

import vn.aliviet.order.util.JSONUtil;

import java.io.IOException;
import java.util.List;

/**
 * Created by windluffy on 27/02/2016.
 */
public class ExternalProductEntity {
    private String id;
    private String linkSource;
    private String productName;
    private String shopName;
    private String color;
    private String size;
    private String packageName;
    private String featureImage;
    private double price;
    private int quantity;
    private String notes;

    private ColorsProduct colors;
    private List<String> packages;
    private List<String> sizes;

    public ExternalProductEntity() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLinkSource() {
        return linkSource;
    }

    public void setLinkSource(String linkSource) {
        this.linkSource = linkSource;
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

    public ColorsProduct getColors() {
        return colors;
    }

    public void setColors(ColorsProduct colors) {
        this.colors = colors;
    }

    public List<String> getPackages() {
        return packages;
    }

    public void setPackages(List<String> packages) {
        this.packages = packages;
    }

    public List<String> getSizes() {
        return sizes;
    }

    public void setSizes(List<String> sizes) {
        this.sizes = sizes;
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

    public Product getProductEntity() {
        Product entity = new Product();
        entity.setColor(this.color);
        entity.setCrwColors(this.colors.toString());
        try {
            entity.setCrwPackages(JSONUtil.toJsonString(this.packages));
        } catch (IOException e) {
            entity.setCrwPackages(null);
        }
        try {
            entity.setCrwSizes(JSONUtil.toJsonString(this.sizes));
        } catch (IOException e) {
            entity.setCrwSizes(null);
        }
        entity.setFeatureImage(this.featureImage);
        entity.setLinkSource(this.linkSource);
        entity.setNotes(this.notes);
        entity.setPackageName(this.getPackageName());
        entity.setPrice(this.getPrice());
        entity.setProductName(this.productName);
        entity.setQuantity(this.getQuantity());
        entity.setShopName(this.getShopName());
        entity.setSize(this.size);

        return entity;
    }
}
