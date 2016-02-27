package vn.aliviet.order.authorization.impl;

import org.springframework.stereotype.Component;
import vn.aliviet.order.authorization.exception.InvalidAuthorizationHeaderException;
import vn.aliviet.order.user.entity.ExternalUser;
import vn.aliviet.order.user.entity.Role;

import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.security.Principal;

/**
 * Created by windluffy on 25/02/2016.
 */
@Provider
@Component
public class SecurityContextImpl implements SecurityContext {
    private final ExternalUser user;

    public SecurityContextImpl(ExternalUser user) {
        this.user = user;
    }

    public Principal getUserPrincipal() {
        return user;
    }

    public boolean isUserInRole(String role) {
        if(role.equalsIgnoreCase(Role.anonymous.name())) {
            return true;
        }
        if(user == null) {
            throw new InvalidAuthorizationHeaderException();
        }
        return user.getRole().equalsIgnoreCase(role);
    }

    public boolean isSecure() {
        return false;
    }

    public String getAuthenticationScheme() {
        return SecurityContext.BASIC_AUTH;
    }
}
