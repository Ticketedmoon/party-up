package com.skybreak.application.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    @GetMapping(value = "/", produces = MediaType.ALL_VALUE)
    public ModelAndView index() {
        return new ModelAndView("index");
    }

}
