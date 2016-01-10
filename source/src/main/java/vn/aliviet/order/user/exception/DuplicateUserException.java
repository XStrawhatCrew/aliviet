package vn.aliviet.order.user.exception;

import vn.aliviet.order.exception.BaseWebApplicationException;

public class DuplicateUserException extends BaseWebApplicationException {
    public enum  DuplicateType {
        email,
        username
    }
    public DuplicateUserException() {
        super(409, "40901", "User already exists", "An attempt was made to create a user that already exists");
    }

    public DuplicateUserException(DuplicateType duplicateType) {
        super(409, "40901", "Người dùng đã tồn tại", duplicateType.toString().toUpperCase() + " đã được sử dụng!");
    }
}
