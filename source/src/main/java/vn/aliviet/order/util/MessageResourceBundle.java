package vn.aliviet.order.util;

import java.util.Locale;
import java.util.ResourceBundle;

/**
 * Created by windluffy on 12/12/2015.
 */
public class MessageResourceBundle {
    private static MessageResourceBundle ourInstance = new MessageResourceBundle();
    private final String RESOURCE_NAME = "message";

    private ResourceBundle rb = null;

    public static MessageResourceBundle getInstance() {
        return ourInstance;
    }

    private MessageResourceBundle() {
        rb = ResourceBundle.getBundle(RESOURCE_NAME, Locale.getDefault(), this.getClass().getClassLoader());
    }

    public ResourceBundle getResourceBundle() {
        return this.rb;
    }
}
