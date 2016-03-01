package vn.aliviet.order.biz;

import vn.aliviet.order.biz.entity.ExternalOrderEntity;
import vn.aliviet.order.biz.entity.Order;
import vn.aliviet.order.user.entity.User;

/**
 * Created by windluffy on 25/02/2016.
 */
public interface OrderService {
    Order create(ExternalOrderEntity externalOrderEntity, User user);
}
