package edu.hsog.flat.backend;

import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.repository.CustomerRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.assertEquals;

/**
 * Created by kathi on 01.06.17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestRepositories {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    //eMail is unique
    @Test
    public void testFindByName() {
        Customer customer = new Customer();
        customer.setContractNumber(454545454545L);
        customer.setPassword("forUnitTests");
        customer.setEmail("hallo@world.de");
        customerRepository.save(customer);
        Customer client = customerRepository.findByEmail("hallo@world.de");

        assertEquals("hallo@world.de", client.getEmail());
        customerRepository.delete(customer);
    }
}
