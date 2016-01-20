package vn.aliviet.order.user.entity;

import vn.aliviet.order.user.api.CheckUserStatusRequest;

/**
 * Created by windluffy on 20/01/2016.
 */
public class UserStatus {
    private final String value;
    private final CheckUserStatusRequest.CheckType checkType;
    private final boolean isExisted;

    public UserStatus(String value, CheckUserStatusRequest.CheckType checkType, boolean isExisted) {
        this.value = value;
        this.checkType = checkType;
        this.isExisted = isExisted;
    }

    public String getValue() {
        return value;
    }

    public CheckUserStatusRequest.CheckType getCheckType() {
        return checkType;
    }

    public boolean isExisted() {
        return isExisted;
    }
}
