package vn.aliviet.order.user.api;

/**
 * Created by windluffy on 31/12/2015.
 */
public class AuthenticatedUserToken {
    private String userId;
    private String token;

    public AuthenticatedUserToken(String userId, String token) {
        this.userId = userId;
        this.token = token;
    }

    public AuthenticatedUserToken() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
