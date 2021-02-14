package com.partyup.application.controller;

import com.partyup.application.domain.entity.User;
import com.partyup.application.exception.PartyUpAccessException;
import com.partyup.application.exception.UsernameNotValidException;
import com.partyup.application.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createNewUser(@RequestBody User user) {
        try {
            userService.registerNewUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (UsernameNotValidException e) {
            log.info("Error: {}", e.getMessage());
            throw new PartyUpAccessException("Invalid Username - User already exists with name", e);
        }
    }

}
