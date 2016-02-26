package vn.aliviet.order.authorization.exception;

import vn.aliviet.order.exception.BaseWebApplicationException;

/**
 * Created by windluffy on 25/02/2016.
 */
public class InvalidAuthorizationHeaderException extends BaseWebApplicationException {


    public static final String DEVELOPER_MESSAGE = "Authorization failed. This could be due to missing properties in the header or" +
            " the Authorization header may have been incorrectly hashed";

    public InvalidAuthorizationHeaderException() {
        super(401, "40101", "Authorization failed", DEVELOPER_MESSAGE);
    }

}