package vn.aliviet.order.service;

import vn.aliviet.order.exception.ValidationException;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.Set;

/**
 * @version 1.0
 * @author: Iain Porter
 * @since 08/05/2013
 */
public abstract class BaseService {

    private Validator validator;

    public BaseService(Validator validator) {
        this.validator = validator;
    }

    protected void validate(Object request) {
        Set<? extends ConstraintViolation<?>> constraintViolations = validator.validate(request);
        if (constraintViolations.size() > 0) {
            throw new ValidationException(constraintViolations);
        }
    }

}
