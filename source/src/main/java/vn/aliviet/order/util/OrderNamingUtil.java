package vn.aliviet.order.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by windluffy on 29/02/2016.
 */
public class OrderNamingUtil {
    public static String generateOrderCd(String userCd, int pos) {
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("ddMM");
        String suffix = format.format(date) + pos;
        return userCd + "_" + suffix;
    }
}
