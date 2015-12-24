package vn.aliviet.order.biz;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * Created by windluffy on 10/6/2015.
 */
abstract class DBBase {
    protected Connection conn;

    public DBBase(Connection conn) {
        this.conn = conn;
    }

    public DBBase() throws SQLException, ClassNotFoundException {
        this.conn = (new DBConnection()).getConnection();
    }
}
