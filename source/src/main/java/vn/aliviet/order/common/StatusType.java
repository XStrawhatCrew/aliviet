package vn.aliviet.order.common;

/**
 * Created by windluffy on 10/1/2015.
 */
public class StatusType {
    public static final int PRODUCT_REJECTED = 12;
    public static final int PRODUCT_NOT_DONE = 11;
    public static final int PRODUCT_DONE = 10;

    public static final int ORDER_WAIT_PROGRESSING = 21;
    public static final int ORDER_PROGRESSING = 22;
    public static final int ORDER_WAIT_CHECKOUT = 23;
    public static final int ORDER_CHECKED_OUT = 24;
    public static final int ORDER_SENT = 25;
    public static final int ORDER_CUSTOMER_RECEIVED = 26;
    public static final int ORDER_CUSTOMER_CHECKOUT_COMPLETED = 27;
    public static final int ORDER_REJECTED = 28;

    public static String getTitle(int statusId) {
        switch (statusId) {
            case PRODUCT_REJECTED:
                return "product rejected";
            case PRODUCT_NOT_DONE:
                return "product not done";
            case PRODUCT_DONE:
                return "product done";
            case ORDER_WAIT_PROGRESSING:
                return "The order is waiting progress";
            case ORDER_PROGRESSING:
                return "The order is progressing";
            case ORDER_WAIT_CHECKOUT:
                return "The order is 'paied' but not yet checkout";
            case ORDER_CHECKED_OUT:
                return "The order is checked out";
            case ORDER_SENT:
                return "The order is sent from China to Vietnam";
            case ORDER_CUSTOMER_RECEIVED:
                return "The order is hand over by the customer";
            case ORDER_CUSTOMER_CHECKOUT_COMPLETED:
                return "The order is completed";
            case ORDER_REJECTED:
                return "The order is rejected";
            default:
                return "Not defined status";
        }
    }
}
