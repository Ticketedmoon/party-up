package com.skybreak.application.service;

import com.skybreak.application.controller.LoginController;
import com.skybreak.application.domain.entity.User;
import com.skybreak.application.domain.enums.UserRole;
import com.skybreak.application.exception.UsernameNotFoundException;
import com.skybreak.application.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public User userAttemptLogin(User user) {
        logger.info(String.format("Attempting to verify user with username: {%s}", user.getUsername()));
        User existingUser = userRepository.findUserByUsername(user.getUsername());
        // User exists, now verify hashed password.
        if (existingUser.getPassword().equals(passwordEncoder.encode(user.getPassword()))) {
            logger.info(String.format("User with username: {%s} successfully authenticated", user.getUsername()));
            return existingUser;
        }
        return null;
    }

    public User registerNewUser(User newUser) throws UsernameNotFoundException {
        logger.info(String.format("User with username: {%s} attempting creation", newUser.getUsername()));
        if (!isUsernameValid(newUser.getUsername())) {
            throw new UsernameNotFoundException("There is an account with that email address:" + newUser.getUsername());
        }

        // Use the PasswordEncoder to hash the password during the user registration process
        User user = new User();
        user.setUsername(newUser.getUsername());
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setRole(UserRole.STANDARD);
        return userRepository.save(user);
    }

    private boolean isUsernameValid(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user != null) {
            logger.info(String.format("User with username: {%s} successfully authenticated", username));
        }
        return user != null;
    }

}
