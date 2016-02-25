package vn.aliviet.order.filter;

import org.glassfish.jersey.server.spi.internal.ValueFactoryProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.aliviet.order.authorization.AuthorizationRequestContext;
import vn.aliviet.order.authorization.AuthorizationService;
import vn.aliviet.order.authorization.impl.RequestSigningAuthorizationService;
import vn.aliviet.order.authorization.impl.SecurityContextImpl;
import vn.aliviet.order.authorization.impl.SessionTokenAuthorizationService;
import vn.aliviet.order.config.ApplicationConfig;
import vn.aliviet.order.user.UserRepository;
import vn.aliviet.order.user.UserService;
import vn.aliviet.order.user.entity.ExternalUser;

import javax.annotation.Priority;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

/**
 * Created by windluffy on 25/02/2016.
 */
@Provider
@Component
@Priority(3000)
public class SecurityContextFilter implements ContainerRequestFilter {

    protected static final String HEADER_AUTHORIZATION = "Authorization";

    protected static final String HEADER_DATE = "x-java-rest-date";

    protected static final String HEADER_NONCE = "nonce";

    private AuthorizationService authorizationService;

    ApplicationConfig config;

    @Autowired
    public SecurityContextFilter(UserRepository userRepository, UserService userService, ApplicationConfig config) {
        delegateAuthorizationService(userRepository, userService, config);
        this.config = config;

    }

    @Override
    public void filter(ContainerRequestContext request) throws IOException {

        String authToken = request.getHeaderString(HEADER_AUTHORIZATION);
        String requestDateString = request.getHeaderString(HEADER_DATE);
        String nonce = request.getHeaderString(HEADER_NONCE);
        AuthorizationRequestContext context = new AuthorizationRequestContext(request.getUriInfo().getPath(), request.getMethod(),
                requestDateString, nonce, authToken);
        ExternalUser externalUser = authorizationService.authorize(context);
        request.setSecurityContext(new SecurityContextImpl(externalUser));
    }

    /**
     * Specify the AuthorizationService that the application should use
     *
     * @param userRepository
     * @param userService
     * @param config
     */
    private void delegateAuthorizationService(UserRepository userRepository, UserService userService, ApplicationConfig config) {
        if(config.requireSignedRequests()) {
            this.authorizationService = new RequestSigningAuthorizationService(userRepository, userService, config);
        } else {
            this.authorizationService = new SessionTokenAuthorizationService(userRepository);
        }
    }
}
