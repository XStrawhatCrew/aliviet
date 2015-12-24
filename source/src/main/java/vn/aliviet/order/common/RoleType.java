package vn.aliviet.order.common;

/**
 * Created by windluffy on 10/1/2015.
 */
public class RoleType {
    public static final int ADMINISTRATOR = 0;
    public static final int CUSTOMER = 1;
    public static final int CUSTOMER_SERVICE = 2;
    public static final int ORDER_BUYER = 3;
    public static final int GOODS_MAN = 4;
    public static final int OPERATOR = 5;
    public static String getTitle(int roleId) {
        switch (roleId) {
            case ADMINISTRATOR:
                return "administrator";
            case CUSTOMER:
                return "customer";
            case CUSTOMER_SERVICE:
                return "customer service";
            case ORDER_BUYER:
                return "order buyer";
            case GOODS_MAN:
                return "goods man";
            case OPERATOR:
                return "operator";
            default:
                return "not defined role";
        }
    }
}
