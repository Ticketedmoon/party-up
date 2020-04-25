package com.skybreak.application.unit.service;

import com.skybreak.application.domain.entity.User;
import com.skybreak.application.repository.UserRepository;
import com.skybreak.application.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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
    public void testUserAttemptLogin_success_userCanLogin() {
        // Given
        User userMock = Mockito.mock(User.class);

        // When
        when(userMock.getUsername()).thenReturn("userMock");
        when(userMock.getPassword()).thenReturn("testPassword");
        when(userRepositoryMock.findUserByUsername(anyString())).thenReturn(userMock);
        when(passwordEncoderMock.matches(anyString(), anyString())).thenReturn(true);

        // Then
        User responseUserObj = userService.userAttemptLogin(userMock);

        // Verify
        verify(userRepositoryMock, times(1)).findUserByUsername(anyString());
        verify(passwordEncoderMock, times(1)).matches(anyString(), anyString());
        Assert.assertEquals(userMock, responseUserObj);
    }

}
