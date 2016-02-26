package vn.aliviet.order.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.aliviet.order.config.ApplicationConfig;
import vn.aliviet.order.service.BaseService;
import vn.aliviet.order.user.api.AuthenticatedUserToken;
import vn.aliviet.order.user.api.CheckUserStatusRequest;
import vn.aliviet.order.user.api.CreateUserRequest;
import vn.aliviet.order.user.api.LoginRequest;
import vn.aliviet.order.user.entity.*;
import vn.aliviet.order.user.exception.AuthenticationException;
import vn.aliviet.order.user.exception.DuplicateUserException;
import vn.aliviet.order.util.ValidatorUtil;

import javax.validation.Validator;

/**
 * Created by windluffy on 03/01/2016.
 */
@Service("userService")
public class UserServiceImp extends BaseService implements UserService {

    private UserRepository userRepository;

    @Autowired
    private ApplicationConfig applicationConfig;

    @Autowired
    public UserServiceImp(Validator validator) {
        super(validator);
    }

    @Override
    @Transactional
    public AuthenticatedUserToken createUser(CreateUserRequest request, Role role) {
        validate(request);
        User newUser = this.createNewUser(request, role);

        AuthenticatedUserToken token = new AuthenticatedUserToken(newUser.getUuid().toString(), this.createAuthorizationToken(newUser).getToken());
        userRepository.save(newUser);
        return token;
    }

    private User createNewUser(CreateUserRequest request, Role role) {
        User userByEmail = userRepository.findByEmail(request.getUser().getEmail());
        User userByUsername = userRepository.findByUsername(request.getUser().getUsername());
        if (userByEmail != null) {
            throw new DuplicateUserException(DuplicateUserException.DuplicateType.email);
        }

        if (userByUsername != null) {
            throw new DuplicateUserException(DuplicateUserException.DuplicateType.username);
        }

        User userToSave = new User(request.getUser());
        try {
            userToSave.setHashedPassword(userToSave.hashPassword(request.getPassword().getPassword()));
        } catch (Exception e) {
            throw new AuthenticationException("Lỗi hash password!");
        }
        userToSave.setRole(role);
        return userToSave;
    }

    @Override
    @Transactional
    public AuthenticatedUserToken login(LoginRequest request) {
        validate(request);
        User user = null;
        if (ValidatorUtil.isEmailType(request.getUsername())) {
            user = userRepository.findByEmail(request.getUsername());
        } else {
            user = userRepository.findByUsername(request.getUsername());
        }

        if (user == null) {
            throw new AuthenticationException("Không thể tìm thấy người dùng với tên đăng nhập/email bạn cung cấp!");
        }
        String hashedPassword = null;

        try {
            hashedPassword = user.hashPassword(request.getPassword());
        } catch (Exception e) {
            throw new AuthenticationException("Lỗi hash password!");
        }

        if (hashedPassword.equals(user.getHashedPassword())) {
            return new AuthenticatedUserToken(user.getUuid().toString(), createAuthorizationToken(user).getToken());
        } else {
            throw new AuthenticationException("Username/Email hoặc password chưa đúng!");
        }
    }

    @Override
    public ExternalUser getUser(ExternalUser requestingUser, String userIdentifer) {
        return null;
    }

    @Override
    public AuthorizationToken createAuthorizationToken(User user) {
        if (user.getAuthorizationToken() == null || user.getAuthorizationToken().hasExpired()) {
            user.setAuthorizationToken(new AuthorizationToken(user, applicationConfig.getAuthorizationExpiryTimeInSeconds()));
            userRepository.save(user);
        }
        return user.getAuthorizationToken();
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserStatus checkUserStatus(CheckUserStatusRequest request) {
        validate(request);
        UserStatus userStatus = null;
        boolean isExisted = false;
        switch (request.getCheckType()) {
            case email:
                isExisted = userRepository.findByEmail(request.getValue()) != null;
                break;
            case username:
                isExisted = userRepository.findByUsername(request.getValue()) != null;
                break;
        }
        return new UserStatus(request.getValue(), request.getCheckType(), isExisted);
    }
}
