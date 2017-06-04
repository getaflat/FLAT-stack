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
    public void testCustomerFindByName() {
        Customer customer = new Customer();
        customer.setContractNumber(454545454545L);
        customer.setPassword("forUnitTests");
        customer.setEmail("hallo@world.de");
        customerRepository.save(customer);
        Customer client = customerRepository.findByEmail("hallo@world.de");

        assertEquals("hallo@world.de", client.getEmail());
        customerRepository.delete(customer);
    }


//    Customer findByContractNumber(@Param("contractNumber") Long contractNumber);
//    Customer findByLastName(@Param("lastName") String lastName);
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


    @Autowired
    private ApartmentRepository aRepository;

    @Autowired
    public void setApartmentRepository(ApartmentRepository aRepository) {
        this.aRepository = aRepository;
    }

    @Test
    public void testFindAppartmentByName(){
        Apartment ap = new Apartment();
        ap.setName("holiday");
        ap.setApartmentId(42L);
        ap.setResidentialBlockId(1990L);
        ap.setIsAvailable(true);
        ap.setNumberOfRooms(3);
        ap.setNumberOfPersons(5);
        ap.setHasBalcony(false);
        ap.setAnimalsAllowed(true);
        ap.setInfantsAllowed(true);
        ap.setDescription("blblabla");
        aRepository.save(ap);

        Apartment temp = aRepository.findByName("holiday");
        Assert.assertEquals("holiday", temp.getName());
        aRepository.delete(ap);
    }

    @Autowired
    private BookingRepository bRepository;

    @Autowired
    public void setBookingRepository(BookingRepository bRepository) {
        this.bRepository = bRepository;
    }


    @Test
    public void findBookingsByContractNumber(){
        Booking book1 = new Booking();
        Booking book2 = new Booking();
        Booking book3 = new Booking();

        book1.setContractNumber(2345L);
        book2.setContractNumber(4567L);
        book3.setContractNumber(2345L);

        book1.setApartmentId(109L);
        book2.setApartmentId(209L);
        book3.setApartmentId(309L);

        book1.setWeek1(32);
        book2.setWeek1(25);
        book3.setWeek1(5);

        book1.setPrice(200);
        book2.setPrice(500);
        book3.setPrice(900);

        book1.setAdditionalCharge(2.5);
        book2.setAdditionalCharge(1.5);
        book3.setAdditionalCharge(0.8);

        book1.setStatus("frei");
        book2.setStatus("frei");
        book3.setStatus("frei");

        bRepository.save(book1);
        bRepository.save(book2);
        bRepository.save(book3);

        Booking[] manyBooks = bRepository.findBycontractNumber(2345L);

        for (Booking b:manyBooks) {
            long temp = b.getContractNumber();
            assertEquals(2345L, temp);
        }

        bRepository.delete(book1);
        bRepository.delete(book2);
        bRepository.delete(book3);
    }
}
