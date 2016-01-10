package vn.aliviet.order.user.exception;

import vn.aliviet.order.exception.BaseWebApplicationException;

public class UserNotFoundException extends BaseWebApplicationException {

    public UserNotFoundException() {
        super(404, "40402", "User Not Found", "No User could be found for that Id");
    }
}
