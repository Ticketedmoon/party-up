package com.codewars.application.controller;

import com.codewars.application.domain.entity.User;
import com.codewars.application.exception.CodeWarsException;
import com.codewars.application.exception.IncorrectPasswordException;
import com.codewars.application.exception.UserNotFoundException;
import com.codewars.application.exception.UsernameNotValidException;
import com.codewars.application.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> login(@RequestBody User user) {
        try {
            User existingUser = userService.userAttemptLogin(user);
            existingUser.setPassword(null);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } catch (UserNotFoundException | IncorrectPasswordException e) {
            logger.info("Error: {}", e.getMessage());
            throw new CodeWarsException("Invalid Credentials Entered", e);
        }
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createNewUser(@RequestBody User user) {
        try {
            userService.registerNewUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (UsernameNotValidException e) {
            logger.info("Error: {}", e.getMessage());
            throw new CodeWarsException("Invalid Username - User already exists with name", e);
        }
    }

}
