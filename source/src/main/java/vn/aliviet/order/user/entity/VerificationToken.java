package vn.aliviet.order.user.entity;

import vn.aliviet.order.model.BaseEntity;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

/**
 * Created by windluffy on 04/01/2016.
 */
@Entity
@Table(name = "tbl_verification_token")
public class VerificationToken extends BaseEntity {
    private static final int DEFAULT_EXPIRY_TIME_IN_MINS = 60 * 24; //24 hours

    public enum VertificationType {
        lostPassword, emailVerification, emailRegistration
    }

    @Column(length = 36)
    private String token;

    private Date expirationDate;

    @Enumerated(EnumType.STRING)
    private VertificationType tokenType;

    private boolean isVerified;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    public VerificationToken() {
        super();
        this.token = UUID.randomUUID().toString();
        this.expirationDate = new Date(System.currentTimeMillis() + (DEFAULT_EXPIRY_TIME_IN_MINS * 60 * 1000L));
        ;
    }

    public boolean hasExpired() {
        return this.expirationDate != null && this.expirationDate.before(new Date());
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public String getToken() {
        return token;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setIsVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }


}
