package com.skybreak.application.service;

import com.skybreak.application.controller.LoginController;
import com.skybreak.application.domain.entity.User;
import com.skybreak.application.domain.enums.UserRole;
import com.skybreak.application.exception.IncorrectPasswordException;
import com.skybreak.application.exception.UserNotFoundException;
import com.skybreak.application.exception.UsernameNotValidException;
import com.skybreak.application.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static Logger logger = LoggerFactory.getLogger(LoginController.class);

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public User userAttemptLogin(User user) throws UserNotFoundException, IncorrectPasswordException {
        logger.info(String.format("Attempting to verify user with username: {%s}", user.getUsername()));
        User existingUser = userRepository.findUserByUsername(user.getUsername());
        // User exists -> Verify password.
        try {
            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                logger.info(String.format("User with username: {%s} successfully authenticated", user.getUsername()));
                return existingUser;
            }
            throw new IncorrectPasswordException(String.format("User found for username: {%s} but incorrect password entered", user.getUsername()));
        } catch (NullPointerException e) {
            throw new UserNotFoundException(String.format("User not found for username: {%s}", user.getUsername()), e);
        }
    }

    public void registerNewUser(User newUser) throws UsernameNotValidException {
        logger.info(String.format("User with username: {%s} attempting creation", newUser.getUsername()));
        if (!isUsernameValid(newUser.getUsername())) {
            throw new UsernameNotValidException("There is an account with that email address:" + newUser.getUsername());
        }

        // Use the PasswordEncoder to hash the password during the user registration process
        User user = new User();
        user.setUsername(newUser.getUsername());
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setRole(UserRole.STANDARD);
        user.setLevel(1);
        logger.info(String.format("Creating user for Code Wars application with credentials: %s", user));
        userRepository.save(user);
    }

    private boolean isUsernameValid(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user != null) {
            logger.info(String.format("User with username: {%s} found in DB", username));
        }
        return user == null;
    }

}
