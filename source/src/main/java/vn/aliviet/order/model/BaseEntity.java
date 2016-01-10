package vn.aliviet.order.model;

import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.util.Assert;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import java.util.Date;
import java.util.UUID;

/**
 * Base class for all JPA entities
 * Created by windluffy on 04/01/2016.
 */
@MappedSuperclass
public abstract class BaseEntity extends AbstractPersistable<Long> {
    @Version
    private int version;

    /***
     * All objects will have a unique UUID which allows for the decoupling from DB generated ids
     */
    @Column(length = 36)
    private String uuid;

    private Date createdDate;

    public BaseEntity() {
        this(UUID.randomUUID());
    }

    public BaseEntity(UUID uuid) {
        Assert.notNull(uuid, "UUID is required");
        this.setUuid(uuid.toString());
        this.createdDate = new Date();
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public UUID getUuid() {
        return UUID.fromString(this.uuid);
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public int getVersion() {
        return version;
    }
}
