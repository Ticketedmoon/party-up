package com.partyup.application.service;

import com.partyup.application.domain.entity.User;
import com.partyup.application.domain.enums.UserRole;
import com.partyup.application.exception.IncorrectPasswordException;
import com.partyup.application.exception.UserNotFoundException;
import com.partyup.application.exception.UsernameNotValidException;
import com.partyup.application.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final OauthClientService oauthClientService;

    public User attemptLogin(User user) throws UserNotFoundException, IncorrectPasswordException {
        log.info("Attempting to verify user with username: {}", user.getUsername());
        User existingUser = userRepository.findUserByUsername(user.getUsername());
        try {
            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                log.info("User with username: {} successfully authenticated", user.getUsername());
                if (!SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
                    // Put token in context and when expire re-store.
                    oauthClientService.generateAccessTokenForContext();
                }
                existingUser.setPassword(null);
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

        // Use the PasswordEncoder to hash the password during the user registration process
        User user = new User();
        user.setUsername(newUser.getUsername());
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setRole(UserRole.STANDARD);
        user.setLevel(1);
        log.info("Created new user for Party Up application");
        userRepository.save(user);
    }

    private boolean isUsernameValid(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user != null) {
            log.info("User with username: {} found in DB", username);
        }
        return user == null;
    }

}
