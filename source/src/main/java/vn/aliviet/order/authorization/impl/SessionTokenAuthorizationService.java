package vn.aliviet.order.authorization.impl;

import vn.aliviet.order.authorization.AuthorizationRequestContext;
import vn.aliviet.order.authorization.AuthorizationService;
import vn.aliviet.order.user.UserRepository;
import vn.aliviet.order.user.entity.AuthorizationToken;
import vn.aliviet.order.user.entity.ExternalUser;
import vn.aliviet.order.user.entity.User;
import vn.aliviet.order.user.exception.AuthorizationException;

/**
 * Created by windluffy on 25/02/2016.
 */
public class SessionTokenAuthorizationService implements AuthorizationService {

    /**
     * directly access user objects
     */
    private final UserRepository userRepository;

    public SessionTokenAuthorizationService(UserRepository repository) {
        this.userRepository = repository;
    }

    public ExternalUser authorize(AuthorizationRequestContext securityContext) {
        String token = securityContext.getAuthorizationToken();
        ExternalUser externalUser = null;
        if(token == null) {
            return externalUser;
        }
        User user =  userRepository.findBySession(token);
        if(user == null) {
            throw new AuthorizationException("Session token not valid");
        }
        AuthorizationToken authorizationToken = user.getAuthorizationToken();
        if (authorizationToken.getToken().equals(token)) {
            externalUser = new ExternalUser(user);
        }
        return externalUser;
    }
}
