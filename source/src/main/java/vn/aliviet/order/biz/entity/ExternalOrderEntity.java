package vn.aliviet.order.biz.entity;

import vn.aliviet.order.user.entity.User;

import java.util.List;

/**
 * Created by windluffy on 27/02/2016.
 */
public class ExternalOrderEntity {
    private List<ExternalProductEntity> products;
    private String shopName;


    public ExternalOrderEntity() {
    }

    public List<ExternalProductEntity> getProducts() {
        return products;
    }

    public void setProducts(List<ExternalProductEntity> products) {
        this.products = products;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

}
