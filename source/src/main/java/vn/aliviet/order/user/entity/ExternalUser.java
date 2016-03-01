package vn.aliviet.order.user.entity;

import org.hibernate.validator.constraints.Length;
import vn.aliviet.order.common.StockNaming;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.security.Principal;

/**
 * Created by windluffy on 31/12/2015.
 */
public class ExternalUser implements Principal{
    private String id;

    private String fullName;

    @NotNull
    @Pattern(regexp = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
            flags = Pattern.Flag.CASE_INSENSITIVE,
            message = "Invalid Email Address"
    )
    private String email;

    @NotNull
    @Length(min = 3, max = 20)
    @Pattern(regexp = "^[A-Za-z0-9_]+$", message = "Invalid Username. Allow: letters, numbers and underscore ")
    private String username;

    private boolean isVerified;
    String role;

    private String phoneNumber;

    private StockNaming.STOCK stockCd;

    public ExternalUser(String id) {
        this.id = id;
    }

    public ExternalUser() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ExternalUser(User user) {
        this.id = user.getUuid().toString();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.isVerified = user.isVerified();
        this.role = user.getRole().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public StockNaming.STOCK getStockCd() {
        return stockCd;
    }

    public void setStockCd(StockNaming.STOCK stockCd) {
        this.stockCd = stockCd;
    }

    @Override
    public String getName() {
        return this.username;
    }
}
