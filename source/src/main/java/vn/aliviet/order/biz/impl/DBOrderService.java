package vn.aliviet.order.biz.impl;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.vendor.HibernateJpaSessionFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.aliviet.order.biz.OrderRepository;
import vn.aliviet.order.biz.OrderService;
import vn.aliviet.order.biz.entity.ExternalOrderEntity;
import vn.aliviet.order.biz.entity.Order;
import vn.aliviet.order.user.entity.User;
import vn.aliviet.order.util.OrderNamingUtil;

/**
 * Created by windluffy on 29/02/2016.
 */
@Service("dbOrderService")
public class DBOrderService implements OrderService {


    private OrderRepository orderRepository;

    @Autowired
    public void setOrderRepository(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional
    public Order create(ExternalOrderEntity externalOrderEntity, User customer) {
        Order order = new Order(externalOrderEntity, customer);
        int nextSEQ = orderRepository.getNextSeq(customer.getId());
        order.setOrderCd(OrderNamingUtil.generateOrderCd(customer.getUserCd(), nextSEQ));
        return orderRepository.save(order);
    }

    private int getNextSeq() {
        return 0;
    }

}
