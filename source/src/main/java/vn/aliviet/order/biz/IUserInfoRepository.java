package vn.aliviet.order.biz;

import vn.aliviet.order.entity.User;
import vn.aliviet.order.exception.CreateUserException;

import java.sql.SQLException;
import java.util.List;

/**
 * Created by windluffy on 10/11/2015.
 */
public interface IUserInfoRepository {
    /***
     * get User is identified by her/his username
     * @param username
     * @return User is identified by her/his username, null if not exist user
     */
    User getUserByUsername(String username) throws SQLException;

    User getUserByEmail(String email) throws SQLException;

    /***
     * get User is identified by her/his id
     * @param id
     * @return User is identified by her/his id
     */
    User getUserById(int id) throws SQLException;

    /***
     * create a new user
     * @param user
     * @return id is auto generated in db when create success, -1 if fail
     */
    int createUser(User user) throws SQLException, CreateUserException;

    /***
     * get all users
     * @return all users from db
     */
    List<User> getAllUsers() throws SQLException;
}
