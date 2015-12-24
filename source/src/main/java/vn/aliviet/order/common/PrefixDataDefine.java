package vn.aliviet.order.common;

/**
 * Created by windluffy on 14/11/2015.
 */
public class PrefixDataDefine {
    public final static String ADMINISTRATOR = "AD";
    public final static String CUSTOMER = "KH";
    public final static String CUSTOMER_SERVICE = "KD";
    public final static String ORDER_BUYER = "MH";
    public final static String GOODS_MAN = "VC";
    public final static String OPERATOR = "DH";

    public static String getTitleByRoleId(int roleId) {
        switch (roleId) {
            case RoleType.ADMINISTRATOR:
                return ADMINISTRATOR;
            case RoleType.CUSTOMER:
                return CUSTOMER;
            case RoleType.CUSTOMER_SERVICE:
                return CUSTOMER_SERVICE;
            case RoleType.ORDER_BUYER:
                return ORDER_BUYER;
            case RoleType.GOODS_MAN:
                return GOODS_MAN;
            case RoleType.OPERATOR:
                return OPERATOR;
            default:
                return "not yet defined";
        }
    }
}
