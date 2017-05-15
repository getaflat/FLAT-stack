package edu.hsog.flat.backend.handler;

import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.security.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Created by hauss on 14.05.2017.
 */
@Component
@RepositoryEventHandler(Customer.class)
public class CustomerEventHandler {
    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @HandleBeforeCreate
    public void handleBeforeCreate(Customer customer) {
        String hash = passwordEncoder.encode(customer.getPassword());
        customer.setPassword(hash);
    }
}
