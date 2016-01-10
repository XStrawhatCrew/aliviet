package vn.aliviet.order.user;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aliviet.order.user.entity.User;

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
     * @param username
     * @return
     */
    User findByUsername(String username);

    /***
     * find by token
     * @param token
     * @return
     */
    //User findBySession(String token);

    /***
     *
     * @param lastUpdated
     * @return
     */
    //List<User> findByExpiredSession(Date lastUpdated);
}
