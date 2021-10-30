package com.partyup.usermanagement.user.application.service;

import com.partyup.usermanagement.user.application.domain.model.User;
import com.partyup.usermanagement.user.application.domain.model.UserRole;
import com.partyup.usermanagement.user.application.exception.IncorrectPasswordException;
import com.partyup.usermanagement.user.application.exception.UserNotFoundException;
import com.partyup.usermanagement.user.application.exception.UsernameNotValidException;
import com.partyup.usermanagement.user.infrastructure.persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private static final int NEW_USER_START_LEVEL = 1;

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public User authenticateUser(User user) throws UserNotFoundException, IncorrectPasswordException {
        log.info("Attempting to verify user with username: {}", user.getUsername());
        User existingUser = userRepository.findUserByUsername(user.getUsername());
        try {
            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                log.info("User with username: {} successfully authenticated", user.getUsername());
                return existingUser;
            }
            throw new IncorrectPasswordException(String.format("User found for username: {%s} but incorrect password entered", user.getUsername()));
        } catch (NullPointerException e) {
            throw new UserNotFoundException(String.format("User not found for username: {%s}", user.getUsername()), e);
        }
    }

    public void registerNewUser(User newUser) throws UsernameNotValidException {
        log.info("User with username: {} attempting creation", newUser.getUsername());
        if (!isUsernameValid(newUser.getUsername())) {
            throw new UsernameNotValidException("There is an account with that email address:" + newUser.getUsername());
        }

        User user = new User();
        user.setUsername(newUser.getUsername());
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setRole(UserRole.STANDARD);
        user.setLevel(NEW_USER_START_LEVEL);
        log.info("Created new user for Party Up application");
        userRepository.save(user);
    }

    public User findUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UserNotFoundException(String.format("User with username %s not found", username));
        }
        user.setPassword(null);
        return user;
    }

    private boolean isUsernameValid(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user != null) {
            log.info("User with username: {} found in DB", username);
        }
        return user == null;
    }
}
