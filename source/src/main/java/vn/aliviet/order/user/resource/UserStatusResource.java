package vn.aliviet.order.user.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.aliviet.order.user.UserRepository;
import vn.aliviet.order.user.UserService;
import vn.aliviet.order.user.api.CheckUserStatusRequest;
import vn.aliviet.order.user.entity.UserStatus;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by windluffy on 20/01/2016.
 */
@Path("/userStatus")
@Component
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserStatusResource {

    @Autowired
    UserService userService;

    @POST
    public Response checkUserStatus(CheckUserStatusRequest request) {
        return Response.ok().entity(userService.checkUserStatus(request)).build();
    }
}
