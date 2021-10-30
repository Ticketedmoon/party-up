package com.partyup.usermanagement.user.application.service;

import com.partyup.usermanagement.user.application.domain.model.User;
import com.partyup.usermanagement.user.application.exception.UsernameNotValidException;
import com.partyup.usermanagement.user.infrastructure.persistence.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

@RunWith(MockitoJUnitRunner.Silent.class)
public class UserServiceTest {

    @Mock
    public PasswordEncoder passwordEncoderMock;

    @Mock
    public UserRepository userRepositoryMock;

    @InjectMocks
    public UserService userService;

    @Test
    public void testRegisterNewUser_successCase() {
        User userMock = Mockito.mock(User.class);
        given(userMock.getUsername()).willReturn("userMock");
        given(userMock.getPassword()).willReturn("testPassword");

        userService.registerNewUser(userMock);

        then(userRepositoryMock).should().findUserByUsername(anyString());
        then(passwordEncoderMock).should().encode(anyString());
        then(userRepositoryMock).should().save(any(User.class));
        verifyNoMoreInteractions(passwordEncoderMock, userRepositoryMock);
    }

    @Test(expected = UsernameNotValidException.class)
    public void testRegisterNewUser_failureCase_userAlreadyExists() {
        User userMock = Mockito.mock(User.class);
        given(userMock.getUsername()).willReturn("userMock");
        given(userMock.getPassword()).willReturn("testPassword");
        given(userRepositoryMock.findUserByUsername(anyString())).willReturn(userMock);
        given(passwordEncoderMock.matches(anyString(), anyString())).willReturn(true);
        userService.registerNewUser(userMock);
    }

}
