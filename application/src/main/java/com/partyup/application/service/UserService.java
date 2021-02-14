package com.partyup.application.service;

import com.partyup.application.domain.entity.User;
import com.partyup.application.domain.enums.UserRole;
import com.partyup.application.exception.UsernameNotValidException;
import com.partyup.application.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final OauthClientService oauthClientService;

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
