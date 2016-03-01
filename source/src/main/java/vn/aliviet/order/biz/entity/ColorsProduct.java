package vn.aliviet.order.biz.entity;

import org.codehaus.jackson.JsonFactory;
import vn.aliviet.order.util.JSONUtil;

import java.io.IOException;
import java.util.List;

/**
 * Created by windluffy on 27/02/2016.
 */
public class ColorsProduct {
    private List<String> data;
    private String type;

    public ColorsProduct() {
    }

    public List<String> getData() {
        return data;
    }

    public void setData(List<String> data) {
        this.data = data;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        try {
            return JSONUtil.toJsonString(this);
        } catch (IOException e) {
            return null;
        }
    }
}
