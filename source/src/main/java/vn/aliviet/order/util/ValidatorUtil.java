package vn.aliviet.order.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by windluffy on 06/01/2016.
 */
public class ValidatorUtil {
    private static String emailRegex = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$";
    public static boolean isEmailType(String str) {
        Pattern pattern = Pattern.compile(emailRegex, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
    }
}
