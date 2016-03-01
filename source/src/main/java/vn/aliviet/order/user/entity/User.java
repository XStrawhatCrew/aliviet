package vn.aliviet.order.user.entity;

import vn.aliviet.order.common.StockNaming;
import vn.aliviet.order.model.BaseEntity;
import vn.aliviet.order.util.HashUtil;

import javax.persistence.*;
import java.security.MessageDigest;
import java.util.UUID;

/**
 * Created by windluffy on 31/12/2015.
 */
@Entity
@Table(name = "tbl_user")
public class User extends BaseEntity {
    /**
     * Add additional salt to password hashing
     */
    private static final String HASH_SALT = "d8a8e885-ecce-42bb-8332-894f20f0d8ed";

    private static final int HASH_ITERATIONS = 1000;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private StockNaming.STOCK stockCd;

    private String phoneNumber;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String username;

    private String hashedPassword;
    private boolean isVerified;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(
            fetch = FetchType.LAZY,
            mappedBy = "user",
            cascade = CascadeType.ALL
    )
    private AuthorizationToken authorizationToken;

    public User() {
        this(UUID.randomUUID());
    }

    public User(UUID uuid) {
        super(uuid);
        this.setRole(Role.anonymous);
    }

    public User(ExternalUser eUser) {
        this();
        this.fullName = eUser.getFullName();
        this.email = eUser.getEmail();
        this.username = eUser.getUsername();
        this.phoneNumber = eUser.getPhoneNumber();
        this.stockCd = eUser.getStockCd();

    }

    public String getUserCd() {
        return this.stockCd.toString() + this.getId();
    }

    public StockNaming.STOCK getStockCd() {
        return stockCd;
    }

    public void setStockCd(StockNaming.STOCK stockCd) {
        this.stockCd = stockCd;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public void setIsVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }

    public void setHashedPassword(String hashPassword) {
        this.hashedPassword = hashPassword;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public synchronized void setAuthorizationToken(AuthorizationToken token) {


        this.authorizationToken = token;
    }

    public synchronized AuthorizationToken getAuthorizationToken() {
        return authorizationToken;
    }

    /**
     * Hash the password using salt values
     * See https://www.owasp.org/index.php/Hashing_Java
     *
     * @param passwordToHash
     * @return hashed password
     */
    public String hashPassword(String passwordToHash) throws Exception {
        return hashToken(passwordToHash, getUuid().toString() + HASH_SALT);
    }


    private String hashToken(String token, String salt) throws Exception {
        return HashUtil.byteToBase64(getHash(HASH_ITERATIONS, token, salt.getBytes()));
    }

    public byte[] getHash(int numberOfIterations, String password, byte[] salt) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        digest.reset();
        digest.update(salt);
        byte[] input = digest.digest(password.getBytes("UTF-8"));
        for (int i = 0; i < numberOfIterations; i++) {
            digest.reset();
            input = digest.digest(input);
        }
        return input;
    }

    public boolean equals(Object otherUser) {
        boolean response = false;

        if (otherUser == null) {
            response = false;
        } else if (!(otherUser instanceof User)) {
            response = false;
        } else {
            if (((User) otherUser).getUuid().equals(this.getUuid())) {
                response = true;
            }
        }

        return response;
    }

    public int hashCode() {
        return getUuid().hashCode();
    }
}
