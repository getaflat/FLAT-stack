package edu.hsog.flat.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactRoutesController {
    @RequestMapping({
            "/",
            "/booking/*",
            "/booking/",
            "/booking/{name}",
            "/gtc",
            "/imprint",
            "/login",
            "/logout",
            "/region",
            "/region/{name}",
            "/register",
            "/user",
            "/fewo",
            "/fewo/{name}"
    })
    public String index() {
        return "index.html";
    }
}