package vn.aliviet.order.user.api;

import javax.validation.constraints.NotNull;

/**
 * Created by windluffy on 20/01/2016.
 */
public class CheckUserStatusRequest {
    public enum CheckType {
        email, username
    }

    @NotNull
    private CheckType checkType;

    @NotNull
    private String value;

    public CheckUserStatusRequest() {
    }

    public CheckType getCheckType() {
        return checkType;
    }

    public void setCheckType(CheckType checkType) {
        this.checkType = checkType;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
