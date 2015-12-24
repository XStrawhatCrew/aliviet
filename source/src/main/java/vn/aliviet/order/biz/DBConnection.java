/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package vn.aliviet.order.biz;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * @author windluffy
 */
public class DBConnection {
    private Connection conn = null;
    private String url;
    private String user;
    private String password;

    public DBConnection(String dbname, String user, String password) throws SQLException, ClassNotFoundException {
        this.url = "jdbc:mysql://localhost:3306/" + dbname;
        this.user = user;
        this.password = password;
        this.connect();
    }

    public DBConnection() throws SQLException, ClassNotFoundException {
        this.url = "jdbc:mysql://localhost:3306/orderhang";
        this.user = "root";
        this.password = "hoaanh";
        this.connect();
    }

    private void connect() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        this.conn = DriverManager.getConnection(url, user, password);
    }

    public Connection getConnection() {
        return this.conn;
    }
}
