package com.partyup.application.controller;

import com.partyup.application.domain.entity.User;
import com.partyup.application.exception.PartyUpException;
import com.partyup.application.exception.UsernameNotValidException;
import com.partyup.application.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public User findUserByUsername(@RequestParam String username) {
        return userService.findUserByUsername(username);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<HttpStatus> createNewUser(@RequestBody User user) {
        try {
            userService.registerNewUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (UsernameNotValidException e) {
            log.info("Error: {}", e.getMessage());
            throw new PartyUpException("Invalid Username - User already exists with name", e);
        }
    }

}
