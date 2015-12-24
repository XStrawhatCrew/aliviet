package vn.aliviet.order.biz;

import vn.aliviet.order.entity.User;
import vn.aliviet.order.exception.CreateUserException;

import java.sql.*;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by windluffy on 10/11/2015.
 */
public class DBUserInfoRepository extends DBBase implements IUserInfoRepository {

    public DBUserInfoRepository() throws SQLException, ClassNotFoundException {
        super();
    }

    public DBUserInfoRepository(Connection conn) {
        super(conn);
    }

    @Override
    public User getUserByUsername(String username) throws SQLException {
        User retUser = null;
        String qSelectUser = "SELECT * FROM user WHERE username = ?";
        PreparedStatement psSelectUser = conn.prepareStatement(qSelectUser);
        psSelectUser.setString(1, username);
        ResultSet rsSelectUser = psSelectUser.executeQuery();
        if (rsSelectUser.next()) {
            retUser = this.createUserFromResultSet(rsSelectUser);
        }
        return retUser;
    }

    @Override
    public User getUserByEmail(String email) throws SQLException {
        User retUser = null;
        String qSelectUser = "SELECT * FROM user WHERE email = ?";
        PreparedStatement psSelectUser = conn.prepareStatement(qSelectUser);
        psSelectUser.setString(1, email);
        ResultSet rsSelectUser = psSelectUser.executeQuery();
        if (rsSelectUser.next()) {
            retUser = this.createUserFromResultSet(rsSelectUser);
        }
        return retUser;
    }

    @Override
    public User getUserById(int id) throws SQLException {
        User retUser = null;
        PreparedStatement psSelectUser = null;
        String qSelectUser = "SELECT * FROM user WHERE id = ?";
        ResultSet rsSelectUser = null;

        psSelectUser = conn.prepareStatement(qSelectUser);
        psSelectUser.setInt(1, id);

        rsSelectUser = psSelectUser.executeQuery();

        if (rsSelectUser.next()) {
            retUser = createUserFromResultSet(rsSelectUser);
        }

        return retUser;
    }

    @Override
    public int createUser(User user) throws SQLException, CreateUserException {
        if (null != this.getUserByUsername(user.getUsername())) {
            throw new CreateUserException(CreateUserException.CreateUserExceptionCode.USERNAME_EXISTED);
        }

        if (null != this.getUserByEmail(user.getEmail())) {
            throw new CreateUserException(CreateUserException.CreateUserExceptionCode.EMAIL_EXISTED);
        }
        String qInsertUser = "INSERT INTO user(username, password, email, is_active, role_id) " +
                "VALUES(?, ?, ?, ?, ?)";
        PreparedStatement psInsertUser = conn.prepareStatement(qInsertUser);
        psInsertUser.setString(1, user.getUsername());
        psInsertUser.setString(2, user.getPassword());
        psInsertUser.setString(3, user.getEmail());
        psInsertUser.setBoolean(4, user.isActive());
        psInsertUser.setInt(5, user.getRoleId());

        return psInsertUser.executeUpdate();
    }

    @Override
    public List<User> getAllUsers() throws SQLException {
        List<User> users = new LinkedList<>();

        String qSelectUsers = "SELECT * FROM user";
        Statement cmd = conn.createStatement();
        ResultSet rs = cmd.executeQuery(qSelectUsers);
        while (rs.next()) {
            users.add(this.createUserFromResultSet(rs));
        }

        return users;
    }

    private User createUserFromResultSet(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setIsActive(rs.getBoolean("is_active"));
        user.setPassword(rs.getString("password"));
        user.setRoleId(rs.getInt("role_id"));
        user.setUsername(rs.getString("username"));
        user.setDateCreated(rs.getDate("date_created"));

        return user;
    }
}
