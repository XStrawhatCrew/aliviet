package vn.aliviet.order.exception;

/**
 * Created by windluffy on 10/11/2015.
 */
public class CreateOrderException extends Exception {
    private CreateOrderExceptionCode exCode;

    public enum CreateOrderExceptionCode {
        EMPTY_PRODUCT,
        CUSTOMER_NOT_EXIST,
        CUSTOMER_NOT_ACTIVE
    }

    public CreateOrderException(CreateOrderExceptionCode createOrderExceptionCode) {
        this.exCode = createOrderExceptionCode;
    }

    @Override
    public String getMessage() {
        switch (exCode) {
            case EMPTY_PRODUCT:
                return "empty product";
            case CUSTOMER_NOT_EXIST:
                return "not exist customer";
            case CUSTOMER_NOT_ACTIVE:
                return "not active customer";
            default:
                return super.getMessage();
        }
    }

    public CreateOrderExceptionCode getExCode() {
        return exCode;
    }
}
