package vn.aliviet.order.biz.entity;

import vn.aliviet.order.common.OrderStatus;
import vn.aliviet.order.model.BaseEntity;
import vn.aliviet.order.user.entity.User;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Created by windluffy on 29/02/2016.
 */
@Entity
@Table(name = "tbl_order")
public class Order extends BaseEntity {
    @Column(unique = true)
    private String orderCd;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String trans_account;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    private String shopName;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "order",
            cascade = CascadeType.ALL
    )
    private Set<Product> products;

    public Order() {
        super(UUID.randomUUID());
    }

    public Order(UUID uuid) {
        super(uuid);
        this.setStatus(OrderStatus.in_cart);
    }

    public Order(ExternalOrderEntity externalOrderEntity, User customer) {
        this();
        this.setCustomer(customer);
        this.setShopName(externalOrderEntity.getProducts().get(0).getShopName());
        this.setProducts(this.getSetProductsFromList(externalOrderEntity.getProducts()));

    }

    private Set<Product> getSetProductsFromList(List<ExternalProductEntity> eProducts) {
        Set<Product> products = new HashSet<Product>(0);

        for (ExternalProductEntity eProduct : eProducts) {
            products.add(eProduct.getProductEntity());
        }
        return products;
    }

    public String getOrderCd() {
        return orderCd;
    }

    public void setOrderCd(String orderCd) {
        this.orderCd = orderCd;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getTrans_account() {
        return trans_account;
    }

    public void setTrans_account(String trans_account) {
        this.trans_account = trans_account;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    @Override
    public boolean equals(Object obj) {
        boolean response = false;

        if (obj == null) {
            response = false;
        } else if (!(obj instanceof Order)) {
            response = false;
        } else {
            if (((Order) obj).getUuid().equals(this.getUuid())) {
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
