package vn.aliviet.order;

import org.glassfish.jersey.server.ResourceConfig;
import vn.aliviet.order.user.resource.UserResource;

/**
 * Created by windluffy on 03/01/2016.
 */
public class MyApplication extends ResourceConfig {
    /***
     * Register jax-rs components
     */
    public MyApplication() {
        packages("vn.aliviet.order");
        //Resource
        register(UserResource.class);
    }
}
