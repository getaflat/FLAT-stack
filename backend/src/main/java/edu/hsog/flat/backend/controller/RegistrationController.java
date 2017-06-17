package edu.hsog.flat.backend.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.repository.CustomerRepository;
import edu.hsog.flat.backend.security.BCryptPasswordEncoder;
import edu.hsog.flat.backend.security.MultipleReadHttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;
import java.io.IOException;

@Controller
public class RegistrationController {
    ObjectMapper mapper;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    RegistrationController(CustomerRepository customerRepository, BCryptPasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.mapper = new ObjectMapper();
        this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @RequestMapping(value = "${spring.data.rest.base-path}/register", method = RequestMethod.POST)
    public ResponseEntity signUp(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        MultipleReadHttpServletRequest multiReadRequest = new MultipleReadHttpServletRequest(request);

        Customer customer = mapper.readValue(multiReadRequest.getInputStream(), Customer.class);

        if (customer == null) {
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (customerRepository.findByEmail(customer.getEmail()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        customer.setTotalScore(0);

        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customerRepository.save(customer);
        multiReadRequest.getRequestDispatcher("/api/v1/login").forward(multiReadRequest, response);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}