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
import org.springframework.test.context.junit4.SpringRunner;
import java.util.List;
import static org.junit.Assert.*;
/**
 * findByContractNumber
 * findByAppartmentID
 * findAll
 * findByAppartmentIDAndWeek1
 * TODO
 * findByBookingId,Query deleteBooking -> unused
 * Created by kathi on 04.06.17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestBookingRepository {
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

        List <Booking> manyBooks = bRepository.findByContractNumber(2345L);

        for (Booking b:manyBooks) {
            long temp = b.getContractNumber();
            assertEquals(2345L, temp);
        }

        bRepository.delete(book1);
        bRepository.delete(book2);
        bRepository.delete(book3);
    }

    @Test
    public void testBookingFindByAppartmentID(){
        Booking book1 = new Booking();
        Booking book2 = new Booking();
        Booking book3 = new Booking();

        book1.setContractNumber(2345L);
        book2.setContractNumber(4567L);
        book3.setContractNumber(5345L);

        book1.setApartmentId(109L);
        book2.setApartmentId(209L);
        book3.setApartmentId(109L);

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

        List <Booking> myBooks = bRepository.findByApartmentId(109L);

        for (Booking b:myBooks ) {
            long temp = b.getApartmentId();
            Assert.assertEquals(109L, temp);
        }

        bRepository.delete(book1);
        bRepository.delete(book2);
        bRepository.delete(book3);
    }

    @Test
    public void testBookingFindAll(){
        Booking book1 = new Booking();
        Booking book2 = new Booking();
        Booking book3 = new Booking();

        book1.setContractNumber(2345L);
        book2.setContractNumber(4567L);
        book3.setContractNumber(5345L);

        book1.setApartmentId(109L);
        book2.setApartmentId(209L);
        book3.setApartmentId(109L);

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

        List <Booking> allBooks = bRepository.findAll();

        Assert.assertNotNull("get no bookings with fondAll()", allBooks);
        int min = allBooks.size();
        Assert.assertTrue("Test failed Booking findall()", min>=3);
        bRepository.delete(book1);
        bRepository.delete(book2);
        bRepository.delete(book3);
    }

    @Test
    public void testFindBookingByAppartmentIdAndWeek1(){
        Booking book1 = new Booking();
        Booking book2 = new Booking();
        Booking book3 = new Booking();

        book1.setContractNumber(2345L);
        book2.setContractNumber(4567L);
        book3.setContractNumber(5345L);

        book1.setApartmentId(109L);
        book2.setApartmentId(209L);
        book3.setApartmentId(109L);

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

        List <Booking> allBooks = bRepository.findByApartmentIdAndWeek1(109L,32);

        assertEquals(book1,allBooks.get(0));

        bRepository.delete(book1);
        bRepository.delete(book2);
        bRepository.delete(book3);
    }
}
