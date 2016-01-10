package vn.aliviet.order.user.exception;

import vn.aliviet.order.exception.BaseWebApplicationException;

public class AuthenticationException extends BaseWebApplicationException {

    public AuthenticationException() {
        super(401, "40102", "Lỗi xác thực", "Username/Email hoặc password chưa đúng!");
    }


}
