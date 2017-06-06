package edu.hsog.flat.backend;

import edu.hsog.flat.backend.model.Apartment;
import edu.hsog.flat.backend.model.Booking;
import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.repository.ApartmentRepository;
import edu.hsog.flat.backend.repository.BookingRepository;
import edu.hsog.flat.backend.repository.CustomerRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.List;
import static org.junit.Assert.*;

/**
 * findByEMail
 * findByContractNumber
 * findByLastName
 * Query should be tested
 * Created by kathi on 01.06.17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestCustomerRepository {

        @Autowired
        private CustomerRepository customerRepository;

        @Autowired
        public void setCustomerRepository(CustomerRepository customerRepository) {
            this.customerRepository = customerRepository;
        }

        //eMail is unique
        @Test
        public void testCustomerFindByEMail() {
        Customer customer = new Customer();
        customer.setContractNumber(454545454545L);
        customer.setPassword("forUnitTests");
        customer.setEmail("hallo@world.de");
        customerRepository.save(customer);
        Customer client = customerRepository.findByEmail("hallo@world.de");

        assertEquals("hallo@world.de", client.getEmail());
        customerRepository.delete(customer);
    }

    @Test
    public void testFindCustomerByContractNumber() {
        Customer customer = new Customer();
        customer.setContractNumber(454545454545L);
        customer.setPassword("forUnitTests");
        customerRepository.save(customer);
        Customer client = customerRepository.findByContractNumber(454545454545L);

        long i = client.getContractNumber();
        assertEquals(454545454545L, i);
        customerRepository.delete(customer);
    }
    @Test
    public void testFindCustomerByLastName(){
        Customer customer = new Customer();
        customer.setContractNumber(454545454545L);
        customer.setPassword("forUnitTests");
        customer.setLastName("Meier");
        customerRepository.save(customer);
        Customer client = customerRepository.findByLastName("Meier");

        Assert.assertEquals("Meier", client.getLastName());
        customerRepository.delete(customer);
    }





}
