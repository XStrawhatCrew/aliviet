package vn.aliviet.order.biz.resource;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

/**
 * Created by windluffy on 25/02/2016.
 */
@Path("orders")
public class OrdersService {

    @GET
    @PermitAll
    public Response testNoRole() {
        return Response.ok().entity("OK").build();
    }

    @POST
    @RolesAllowed("authenticated")
    public Response testWithSpecificRole() {
        return Response.ok().entity("Ngon").build();
    }

    @PUT
    @RolesAllowed("administrator")
    public Response testRoleAdmin() {
        return Response.ok().entity("Admin WTF").build();
    }
}
