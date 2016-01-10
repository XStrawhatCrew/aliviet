package vn.aliviet.order.user.exception;

import vn.aliviet.order.exception.BaseWebApplicationException;

public class AlreadyVerifiedException extends BaseWebApplicationException {

    public AlreadyVerifiedException() {
        super(409, "40905", "Already verified", "The token has already been verified");
    }
}
