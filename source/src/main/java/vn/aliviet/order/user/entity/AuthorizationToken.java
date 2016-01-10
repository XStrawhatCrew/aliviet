package vn.aliviet.order.user.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

/**
 * Created by windluffy on 31/12/2015.
 */
@Entity
@Table(name="tbl_authorization_token")
public class AuthorizationToken extends AbstractPersistable<Long> {
    private final static Integer DEFAULT_TIME_TO_LIVE_IN_SECONDS = (60 * 60 * 24 * 30); //30 Days

    @Column(length = 36)
    private String token;

    private Date createdDate;

    private Date expirationDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public AuthorizationToken() {
    }

    public AuthorizationToken(User user) {
        this(user, DEFAULT_TIME_TO_LIVE_IN_SECONDS);
    }

    public AuthorizationToken(User user, Integer timeToLiveInSeconds) {
        this.token = UUID.randomUUID().toString();
        this.user = user;
        this.createdDate = new Date();
        this.expirationDate = new Date(System.currentTimeMillis() + (timeToLiveInSeconds * 1000L));
    }

    public boolean hasExpired() {
        return this.expirationDate != null && this.expirationDate.before(new Date());
    }

    public String getToken() {
        return token;
    }

    public User getUser() {
        return user;
    }

    public Date getCreatedDate() {
        return createdDate;
    }
}
