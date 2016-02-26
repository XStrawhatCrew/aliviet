package vn.aliviet.order.filter;

import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.springframework.stereotype.Component;

import javax.ws.rs.ext.Provider;

/**
 * Created by windluffy on 25/02/2016.
 */
@Provider
@Component
public class RolesAllowedFilter extends RolesAllowedDynamicFeature {
}
