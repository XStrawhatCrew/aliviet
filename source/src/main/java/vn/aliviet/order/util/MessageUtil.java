package vn.aliviet.order.util;

/**
 * Created by windluffy on 12/12/2015.
 */
public class MessageUtil {
    public static String getMessage(String key) {
        return MessageResourceBundle.getInstance().getResourceBundle().getString(key);
    }
}
