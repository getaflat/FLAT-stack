package edu.hsog.flat.backend;

import edu.hsog.flat.backend.controller.BookingController;
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
 * addBooking
 *
 * findAllBookings is tested in TestBookingRepository
 * findByID uses a framework method only
 * findAllBookingsByAppartmentId is tested in TestBookingRepository
 * findAllBookingsByApartmentIdAndWeek1 is tested in TestBookingRepository
 * getToday uses a framework method only
 * TODO
 * findAllBookingsByContractNumber
 * findAllCustomersByApartmentIdAndWeek1
 * getOldestCustomerByBooking
 * calcMonthsDifference
 * calcWeeksDifference
 * getDeadline
 *
 * läuft noch nicht WiP
 *
 * Created by kathi on 04.06.17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestBookingController {

    @Autowired
    private BookingRepository bRepository;

    @Autowired
    public void setBookingRepository(BookingRepository bRepository) {
        this.bRepository = bRepository;
    }

    //is this allowed here?
    @Autowired
    private BookingController bCont;

    //should be refactored all 2-3 month, using dates
    @Test
    public void testAddBooking(){
        Booking myBooking = new Booking();

        myBooking.setContractNumber(4567L);
        myBooking.setApartmentId(555L);
        myBooking.setWeek1(14);
        myBooking.setYear(2018);
        myBooking.setPrice(500);
        myBooking.setAdditionalCharge(1.5);
        myBooking.setStatus("frei");
        bRepository.save(myBooking);

        bCont.addBooking(myBooking);

        String status = myBooking.getStatus();
        boolean isEqual = status.equals("Wartend");

        Assert.assertNotNull(myBooking.getStatus());
        Assert.assertTrue(isEqual);

        bRepository.delete(myBooking);

        //second testcase
        Booking booking2 = new Booking();

        booking2.setContractNumber(4567L);
        booking2.setApartmentId(555L);
        booking2.setPrice(500);
        booking2.setAdditionalCharge(1.5);
        booking2.setStatus("frei");
        booking2.setYear(2017);
        booking2.setWeek1(28);
        bRepository.save(booking2);

        bCont.addBooking(booking2);

        status = booking2.getStatus();
        isEqual = status.equals("Bestätigt");

        Assert.assertNotNull(booking2.getStatus());
        Assert.assertTrue(isEqual);

        bRepository.delete(booking2);
    }

   // @Test
}
