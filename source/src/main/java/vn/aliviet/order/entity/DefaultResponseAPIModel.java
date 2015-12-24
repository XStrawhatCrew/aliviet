package vn.aliviet.order.entity;

/**
 * Created by windluffy on 15/11/2015.
 */
public class DefaultResponseAPIModel {
    private String errMsg;
    private String errCode;
    private boolean success;
    private Object dataResponse;

    public DefaultResponseAPIModel() {
    }

    public DefaultResponseAPIModel(String errMsg, String errCode, boolean success, Object dataResponse) {
        this.errMsg = errMsg;
        this.errCode = errCode;
        this.success = success;
        this.dataResponse = dataResponse;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.errMsg = errMsg;
    }

    public String getErrCode() {
        return errCode;
    }

    public void setErrCode(String errCode) {
        this.errCode = errCode;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Object getDataResponse() {
        return dataResponse;
    }

    public void setDataResponse(Object dataResponse) {
        this.dataResponse = dataResponse;
    }
}
