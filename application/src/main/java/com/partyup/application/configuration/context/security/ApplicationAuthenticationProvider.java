package com.partyup.application.configuration.context.security;

import com.partyup.application.domain.entity.User;
import com.partyup.application.exception.PartyUpException;
import com.partyup.application.exception.UserNotFoundException;
import com.partyup.application.service.UserService;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApplicationAuthenticationProvider implements AuthenticationProvider {

    private final UserService userService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (authentication.getPrincipal() != null && authentication.getCredentials() != null) {
            User user = User.builder()
                    .username(authentication.getName())
                    .password(authentication.getCredentials().toString())
                    .build();
            UsernamePasswordAuthenticationToken token;
            try {
                User matchedUser = userService.authenticateUser(user);
                token = new UsernamePasswordAuthenticationToken(matchedUser.getUsername(), matchedUser.getPassword(), new ArrayList<>());
            } catch (UserNotFoundException e) {
                token = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), new ArrayList<>());
                token.setAuthenticated(false);
            }
            return token;
        } else {
            throw new PartyUpException("One or more principal details were not found in authentication request.");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }

}