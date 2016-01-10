package vn.aliviet.order.user.exception;

import vn.aliviet.order.exception.BaseWebApplicationException;

public class AuthorizationException extends BaseWebApplicationException {

    public AuthorizationException(String applicationMessage) {
        super(403, "40301", "Not authorized", applicationMessage);
    }

}
