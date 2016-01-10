package vn.aliviet.order.user.api;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

/**
 * Created by windluffy on 31/12/2015.
 */
public class PasswordRequest {
    @NotNull
    @Length(min = 6, max = 50)
    private String password;

    public PasswordRequest() {
    }

    public PasswordRequest(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
