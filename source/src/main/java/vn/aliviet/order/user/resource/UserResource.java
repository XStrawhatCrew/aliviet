package vn.aliviet.order.user.resource;

import org.springframework.beans.factory.annotation.Autowired;
import vn.aliviet.order.user.UserService;
import vn.aliviet.order.user.api.AuthenticatedUserToken;
import vn.aliviet.order.user.api.CreateUserRequest;
import vn.aliviet.order.user.api.LoginRequest;
import vn.aliviet.order.user.entity.Role;

import javax.annotation.security.PermitAll;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;

/**
 * Created by windluffy on 03/01/2016.
 */
@Path("/user")
public class UserResource {

    @Autowired
    private UserService userService;

    @Context
    protected UriInfo uriInfo;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers() {
        return "OK";
    }

    @GET
    @Path("{id}")
    public String getUserById(@PathParam("id") String id) {
        return id;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response signUp(CreateUserRequest request) {
        AuthenticatedUserToken token = userService.createUser(request, Role.authenticated);
        URI location = uriInfo.getAbsolutePathBuilder().path("backend/index.html").build();

        return Response.created(location).entity(token).build();
    }

    @PermitAll
    @Path("login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(LoginRequest request) {
        AuthenticatedUserToken token = userService.login(request);
        return Response.ok().entity(token).build();
    }
}
