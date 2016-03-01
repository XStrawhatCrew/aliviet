package vn.aliviet.order.biz;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.aliviet.order.biz.entity.Order;

/**
 * Created by windluffy on 29/02/2016.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /***
     * Get next sequence number in today of the customer
     * @param customerId the user who order
     * @return next seq
     */
    @Query("select count(o) + 1 from Order o " +
            "   where o.customer = (select u from User u where u.id = ?1)" +
            "       and o.createdDate between date_format(now(), '%Y-%m-%d 00:00:00') and date_format(now(), '%Y-%m-%d 23:59:59')")
    int getNextSeq(long customerId);
}
