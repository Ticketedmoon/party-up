package com.skybreak.application.controller;

import com.skybreak.application.domain.entity.User;
import com.skybreak.application.exception.UsernameNotFoundException;
import com.skybreak.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/", produces = MediaType.ALL_VALUE)
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @GetMapping(value = "/login", produces = MediaType.ALL_VALUE)
    public User login(@RequestParam User user) {
        return userService.userAttemptLogin(user);
    }

    @GetMapping(value = "/login/create", produces = MediaType.ALL_VALUE)
    public User createNewUser(@RequestParam User user) {
        try {
            return userService.registerNewUser(user);
        } catch (UsernameNotFoundException e) {
            return null;
        }
    }

}
