package vn.aliviet.order.user.api;

import vn.aliviet.order.user.entity.ExternalUser;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

/**
 * Created by windluffy on 31/12/2015.
 */
public class CreateUserRequest {
    @NotNull
    @Valid
    private ExternalUser user;

    @NotNull
    @Valid
    private PasswordRequest password;

    public CreateUserRequest(final ExternalUser user, final PasswordRequest password) {
        this.user = user;
        this.password = password;
    }

    public CreateUserRequest() {
    }

    public ExternalUser getUser() {
        return user;
    }

    public void setUser(ExternalUser user) {
        this.user = user;
    }

    public PasswordRequest getPassword() {
        return password;
    }

    public void setPassword(PasswordRequest password) {
        this.password = password;
    }
}
