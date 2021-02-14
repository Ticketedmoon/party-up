package com.partyup.application.configuration.context.security;

import com.partyup.application.domain.entity.User;
import com.partyup.application.exception.IncorrectPasswordException;
import com.partyup.application.exception.PartyUpAccessException;
import com.partyup.application.exception.UserNotFoundException;
import com.partyup.application.repository.UserRepository;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApplicationAuthenticationProvider implements AuthenticationProvider {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (authentication.getPrincipal() != null && authentication.getCredentials() != null) {
            User user = User.builder()
                    .username(authentication.getName())
                    .password(authentication.getCredentials().toString())
                    .build();
            UsernamePasswordAuthenticationToken token;
            try {
                User matchedUser = authenticateUser(user);
                token = new UsernamePasswordAuthenticationToken(matchedUser.getUsername(), matchedUser.getPassword(), new ArrayList<>());
            } catch (Exception e) {
                token = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), new ArrayList<>());
                token.setAuthenticated(false);
            }
            return token;
        } else {
            throw new PartyUpAccessException("One or more principal details were not found in authentication request.");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }

    private User authenticateUser(User user) throws UserNotFoundException, IncorrectPasswordException {
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

}