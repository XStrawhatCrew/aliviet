package vn.aliviet.order.user;

import vn.aliviet.order.user.api.AuthenticatedUserToken;
import vn.aliviet.order.user.api.CreateUserRequest;
import vn.aliviet.order.user.api.LoginRequest;
import vn.aliviet.order.user.entity.AuthorizationToken;
import vn.aliviet.order.user.entity.ExternalUser;
import vn.aliviet.order.user.entity.Role;
import vn.aliviet.order.user.entity.User;

/**
 * Created by windluffy on 31/12/2015.
 */
public interface UserService {
    /***
     * Create a new User with the given role
     * @param request
     * @param role
     * @return AuthenticatedUserToken
     */
    public AuthenticatedUserToken createUser(CreateUserRequest request, Role role);

    /***
     * Login to the system
     * @param request
     * @return AuthenticatedUserToken
     */
    public AuthenticatedUserToken login(LoginRequest request);

    /***
     * Get a User based on a unique identifier
     * Identifiers supported uuid, email
     * @param requestingUser
     * @param userIdentifer
     * @return User
     */
    public ExternalUser getUser(ExternalUser requestingUser, String userIdentifer);

    /***
     * Create authorization for the User
     * @param user
     * @return
     */
    public AuthorizationToken createAuthorizationToken(User user);

}

