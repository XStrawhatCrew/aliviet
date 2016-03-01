package vn.aliviet.order.util;

import org.codehaus.jackson.map.ObjectMapper;

import java.io.IOException;

/**
 * Created by windluffy on 29/02/2016.
 */
public class JSONUtil {
    private static ObjectMapper mapper = new ObjectMapper();

    public static String toJsonString(Object obj) throws IOException {
        return mapper.writeValueAsString(obj);
    }
}
