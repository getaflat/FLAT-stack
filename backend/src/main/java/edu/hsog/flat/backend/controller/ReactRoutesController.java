package edu.hsog.flat.backend.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactRoutesController /* implements ErrorController */ {
    //private static final String ERROR_PATH = "/error";

    @RequestMapping({
            "/",
            "/booking",
            "/gtc",
            "/imprint",
            "/login",
            "/logout",
            "/region",
            "/region/{id}",
            "/register",
            "/user",
            "/fewo"//,
            //ERROR_PATH
    })
    public String index() {
        return "forward:/index.html";
    }

    /* @Override
    public String getErrorPath() {
        return ERROR_PATH;
    } */
}