package vn.aliviet.order.biz;

import vn.aliviet.order.common.StatusType;
import vn.aliviet.order.entity.OrderBill;
import vn.aliviet.order.entity.Product;
import vn.aliviet.order.entity.User;
import vn.aliviet.order.exception.CreateOrderException;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by windluffy on 10/1/2015.
 */
public class DBOrderProductsRepository extends DBBase implements IOrderProductsRepository {

    public DBOrderProductsRepository() throws SQLException, ClassNotFoundException {
        super();
    }

    public DBOrderProductsRepository(Connection conn) {
        super(conn);
    }

    @Override
    public int createOrder(int customerId, List<Product> products) throws CreateOrderException, SQLException {
        int orderIdCreated = -1;

        if (products == null || products.size() == 0) {
            throw new CreateOrderException(CreateOrderException.CreateOrderExceptionCode.EMPTY_PRODUCT);
        }

        IUserInfoRepository iUserInfoRepository = new DBUserInfoRepository(conn);
        User theCustomer = iUserInfoRepository.getUserById(customerId);
        if (theCustomer == null) {
            throw new CreateOrderException(CreateOrderException.CreateOrderExceptionCode.CUSTOMER_NOT_EXIST);
        } else if (!theCustomer.isActive()) {
            throw new CreateOrderException(CreateOrderException.CreateOrderExceptionCode.CUSTOMER_NOT_ACTIVE);
        }

        String qInsertOrderBill = "INSERT INTO order_bill (customer_id, status_id) VALUES (?, ?)";
        String qInsertProducts = "INSERT INTO product (link_source, shop_name, color, notes, size, quantity, price, status_id, order_id)" +
                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        PreparedStatement psInsertOrderBill = null;
        PreparedStatement psInsertProducts = null;
        Savepoint savepoint = null;
        try {
            conn.setAutoCommit(false);
            savepoint = conn.setSavepoint();

            //insert order bill
            psInsertOrderBill = conn.prepareStatement(qInsertOrderBill, PreparedStatement.RETURN_GENERATED_KEYS);
            psInsertOrderBill.setInt(1, customerId);
            psInsertOrderBill.setInt(2, StatusType.ORDER_WAIT_PROGRESSING);
            psInsertOrderBill.executeUpdate();

            //get order id which is generated when insert order_bill
            ResultSet rsOrderIdCreated = psInsertOrderBill.getGeneratedKeys();
            if (rsOrderIdCreated != null && rsOrderIdCreated.next()) {
                orderIdCreated = rsOrderIdCreated.getInt(1);
            }

            //insert products
            psInsertProducts = conn.prepareStatement(qInsertProducts);
            for (Product p : products) {
                psInsertProducts.setString(1, p.getLinkSource());
                psInsertProducts.setString(2, p.getShopName());
                psInsertProducts.setString(3, p.getColor());
                psInsertProducts.setString(4, p.getNotes());
                psInsertProducts.setString(5, p.getSize());
                psInsertProducts.setInt(6, p.getQuantity());
                psInsertProducts.setInt(7, p.getPrice());
                psInsertProducts.setInt(8, StatusType.PRODUCT_NOT_DONE);
                psInsertProducts.setInt(9, orderIdCreated);
                psInsertProducts.addBatch();
            }
            psInsertProducts.executeBatch();

            conn.commit();
        } catch (NullPointerException ex) {
            ex.printStackTrace();
        } catch (SQLException ex) {
            orderIdCreated = -1;
            try {
                if (savepoint != null) {
                    conn.rollback(savepoint);
                } else {
                    conn.rollback();
                }
            } catch (SQLException sqlEx) {
                sqlEx.printStackTrace();
            }
            throw new SQLException("insert fail");
        } finally {
            try {
                if (psInsertOrderBill != null) {
                    psInsertOrderBill.close();
                }
                if (psInsertProducts != null) {
                    psInsertProducts.close();
                }
                conn.setAutoCommit(true);
            } catch (SQLException sqlEx) {
                sqlEx.printStackTrace();
            }
        }
        return orderIdCreated;
    }

    @Override
    public Product getProductByProductId(int productId) {
        Product retProduct = null;
        PreparedStatement psSelectProduct = null;
        String qSelectProduct = "SELECT * FROM product WHERE id = ?";
        ResultSet rsProduct = null;

        try {
            psSelectProduct = conn.prepareStatement(qSelectProduct);
            psSelectProduct.setInt(1, productId);
            rsProduct = psSelectProduct.executeQuery();
            if (rsProduct != null && rsProduct.next()) {
                retProduct = new Product();
                retProduct.setId(productId);
                retProduct.setColor(rsProduct.getString("color"));
                retProduct.setLinkSource(rsProduct.getString("link_source"));
                retProduct.setNotes(rsProduct.getString("notes"));
                retProduct.setPrice(rsProduct.getInt("price"));
                retProduct.setQuantity(rsProduct.getInt("quantity"));
                retProduct.setShopName(rsProduct.getString("shop_name"));
                retProduct.setSize(rsProduct.getString("size"));
                retProduct.setStatusId(rsProduct.getInt("status_id"));

            }
        } catch (Exception ex) {
            retProduct = null;
        } finally {
            if (psSelectProduct != null) {
                try {
                    psSelectProduct.close();
                } catch (SQLException sqlEx) {
                    sqlEx.printStackTrace();
                }
            }
            if (rsProduct != null) {
                try {
                    rsProduct.close();
                } catch (SQLException sqlEx) {
                    sqlEx.printStackTrace();
                }
            }
        }
        return retProduct;
    }

    @Override
    public List<OrderBill> getAllOrderBills() throws SQLException {
        List<OrderBill> retOrderBills = new ArrayList<>();
        Statement cmd = conn.createStatement();
        String qSelectAllOrderBills = "SELECT * FROM order_bill";

        ResultSet rs = cmd.executeQuery(qSelectAllOrderBills);
        while (rs.next()) {
            OrderBill orderBill = new OrderBill();
            orderBill.setId(rs.getInt("id"));
            orderBill.setStaffId(rs.getInt("staff_id"));
            orderBill.setCustomerId(rs.getInt("customer_id"));
            orderBill.setStatusId(rs.getInt("status_id"));
            orderBill.setDateCreated(rs.getTimestamp("date_created"));
            retOrderBills.add(orderBill);
        }

        return retOrderBills;
    }
}
