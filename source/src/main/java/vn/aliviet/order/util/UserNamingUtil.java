package vn.aliviet.order.util;

import vn.aliviet.order.common.StockNaming;

/**
 * Created by windluffy on 29/02/2016.
 */
public class UserNamingUtil {
    public static String generateUserCd(StockNaming.STOCK stockCd, String id) {
        return stockCd.toString() + id;
    }
}
