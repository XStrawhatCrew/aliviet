package vn.aliviet.order.biz.resource;

import org.springframework.beans.factory.annotation.Autowired;
import vn.aliviet.order.biz.OrderRepository;
import vn.aliviet.order.biz.OrderService;
import vn.aliviet.order.biz.api.CreateOrdersRequest;
import vn.aliviet.order.biz.entity.Order;
import vn.aliviet.order.user.UserRepository;
import vn.aliviet.order.user.entity.ExternalUser;
import vn.aliviet.order.user.entity.User;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * Created by windluffy on 25/02/2016.
 */
@Path("orders")
public class OrdersResource {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderService orderService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("customer")
    public Response createOrdersInCart(CreateOrdersRequest createOrdersRequest, @Context SecurityContext securityContext) {
        User customer = userRepository.findByUsername(securityContext.getUserPrincipal().getName());
        Order newOrder = orderService.create(createOrdersRequest.getOrders().get(0), customer);
        return Response.created(null).build();
    }

    @Path("/seq")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("customer")
    public Response getNextSEQ(@Context SecurityContext securityContext) {
        long customerId = userRepository.findByUsername(securityContext.getUserPrincipal().getName()).getId();
        int i = orderRepository.getNextSeq(customerId);

        return Response.ok().entity(i).build();
    }
}
