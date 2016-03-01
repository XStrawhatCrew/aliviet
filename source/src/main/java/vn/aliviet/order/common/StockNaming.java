package vn.aliviet.order.common;

/**
 * Created by windluffy on 29/02/2016.
 */
public class StockNaming {
    public enum STOCK {
        HN, SG
    }

    public static String getTitle(STOCK stockCd) {
        switch (stockCd) {
            case HN:
                return "Hà Nội";
            case SG:
                return "Sài Gòn";
            default:
                return "";
        }
    }
}
