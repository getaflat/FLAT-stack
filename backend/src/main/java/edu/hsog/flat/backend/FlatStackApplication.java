package edu.hsog.flat.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;

@Controller
@SpringBootApplication
public class FlatStackApplication {
	public static void main(String[] args) {
		SpringApplication.run(FlatStackApplication.class, args);
	}
}
