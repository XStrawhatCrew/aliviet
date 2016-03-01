package vn.aliviet.order.biz.api;

import vn.aliviet.order.biz.entity.ExternalOrderEntity;

import java.util.List;

/**
 * Created by windluffy on 27/02/2016.
 */
public class CreateOrdersRequest {
    private List<ExternalOrderEntity> orders;

    public CreateOrdersRequest() {
    }

    public List<ExternalOrderEntity> getOrders() {
        return orders;
    }

    public void setOrders(List<ExternalOrderEntity> orders) {
        this.orders = orders;
    }
}
