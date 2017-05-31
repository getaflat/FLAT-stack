package edu.hsog.flat.backend.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.repository.CustomerRepository;
import edu.hsog.flat.backend.security.MultipleReadHttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class RegistrationController {
    ObjectMapper mapper;

    @Autowired
    CustomerRepository customerRepository;

    RegistrationController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
        this.mapper = new ObjectMapper();
        this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @RequestMapping(value = "${spring.data.rest.base-path}/register", method = RequestMethod.POST)
    public void signUp(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        MultipleReadHttpServletRequest multiReadRequest = new MultipleReadHttpServletRequest(request);

        Customer customer = mapper.readValue(multiReadRequest.getInputStream(), Customer.class);

        if (customer != null) {
            customerRepository.save(customer);
            multiReadRequest.getRequestDispatcher("/api/v1/login").forward(multiReadRequest, response);
        }
    }
}