package vn.aliviet.order.authorization;

import vn.aliviet.order.user.entity.ExternalUser;

/**
 * Created by windluffy on 25/02/2016.
 */
public interface AuthorizationService {
    /**
     * Given an AuthorizationRequestContext validate and authorize a User
     *
     * @param authorizationRequestContext the context required to authorize a user for a particular request
     * @return ExternalUser
     */
    public ExternalUser authorize(AuthorizationRequestContext authorizationRequestContext);
}
