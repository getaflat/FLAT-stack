package edu.hsog.flat.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@SpringBootApplication
public class FlatStackApplication {
	/* @RequestMapping("/")
	public String index() {
		return "index.html";
	} */

	public static void main(String[] args) {
		SpringApplication.run(FlatStackApplication.class, args);
	}
}
