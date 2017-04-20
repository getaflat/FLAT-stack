package edu.hsog.flat.backend;

import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class Application {
	@RequestMapping("/")
	public String index() {
		return "index.html";
	}

	public static void main(String[] args) {
		SpringBootApplication.run(Application.class, args);
	}
}