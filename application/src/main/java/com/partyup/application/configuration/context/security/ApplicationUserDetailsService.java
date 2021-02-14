package com.partyup.application.configuration.context.security;

import com.partyup.application.domain.entity.User;
import com.partyup.application.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApplicationUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findUserByUsername(username);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                AuthorityUtils.createAuthorityList(user.getRole().name()));
    }

}
