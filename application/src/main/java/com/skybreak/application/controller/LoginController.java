package com.skybreak.application.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skybreak.application.domain.entity.User;
import com.skybreak.application.exception.UsernameNotFoundException;
import com.skybreak.application.service.UserService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping(value = "/", produces = MediaType.ALL_VALUE)
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody User login(@RequestBody String userDTO) throws IOException {
        final User user = objectMapper.readValue(userDTO, User.class);
        return userService.userAttemptLogin(user);
    }

    @GetMapping(value = "/login/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody User createNewUser(@RequestParam String userDTO) throws IOException {
        try {
            final User user = objectMapper.readValue(userDTO, User.class);
            return userService.registerNewUser(user);
        } catch (UsernameNotFoundException e) {
            return null;
        }
    }

}
