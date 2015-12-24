package vn.aliviet.order.exception;

import vn.aliviet.order.util.MessageUtil;

/**
 * Created by windluffy on 12/12/2015.
 */
public class CreateUserException extends Exception{
    public enum CreateUserExceptionCode {
        USERNAME_EXISTED,
        EMAIL_EXISTED
    }

    private CreateUserExceptionCode errCd;

    public CreateUserException(CreateUserExceptionCode errCd) {
        this.errCd = errCd;
    }

    @Override
    public String getMessage() {
        switch (this.errCd) {
            case USERNAME_EXISTED:
                return MessageUtil.getMessage("cu001");
            case EMAIL_EXISTED:
                return MessageUtil.getMessage("cu002");
        }
        return super.getMessage();
    }
}
