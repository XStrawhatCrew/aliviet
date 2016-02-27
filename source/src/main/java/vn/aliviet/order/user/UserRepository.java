package vn.aliviet.order.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.aliviet.order.user.entity.User;

import java.util.Date;
import java.util.List;

/**
 * Created by windluffy on 31/12/2015.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    /***
     * find by email address
     *
     * @param email
     * @return user
     */
    User findByEmail(String email);

    /***
     * find by UUID
     *
     * @param uuid
     * @return user
     */
    User findByUuid(String uuid);

    /***
     * find by username
     *
     * @param username
     * @return
     */
    User findByUsername(String username);

    /***
     * find by token
     *
     * @param token
     * @return
     */
    @Query("select u from User u where u = (select user from AuthorizationToken where token = ?)")
    User findBySession(String token);

    /***
     * @param lastUpdated
     * @return
     */
    @Query("select u from User u where u in (select user from AuthorizationToken where lastUpdated < ?)")
    List<User> findByExpiredSession(Date lastUpdated);
}
