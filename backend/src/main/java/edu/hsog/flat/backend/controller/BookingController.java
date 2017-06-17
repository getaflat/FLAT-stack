package edu.hsog.flat.backend.controller;

import edu.hsog.flat.backend.model.Booking;
import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.repository.ApartmentRepository;
import edu.hsog.flat.backend.repository.BookingRepository;
import edu.hsog.flat.backend.repository.CustomerRepository;
import org.joda.time.LocalDate;
import org.joda.time.Months;
import org.joda.time.Weeks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Controller
public class BookingController {
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    ApartmentRepository apartmentRepository;

    @Autowired
    CustomerRepository customerRepository;

    BookingController(BookingRepository bookingRepository, ApartmentRepository apartmentRepository, CustomerRepository customerRepository) {
        this.bookingRepository = bookingRepository;
        this.apartmentRepository = apartmentRepository;
        this.customerRepository = customerRepository;
    }

    @RequestMapping(path = "${spring.data.rest.base-path}/bookingsnew", method = RequestMethod.GET)
    @ResponseBody
    public List<Booking> findAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();

        return bookings;
    }

    @RequestMapping(path = "${spring.data.rest.base-path}/bookingsnew/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Booking findById(@PathVariable(value = "id") String id) {
        Booking booking = bookingRepository.findOne(Long.parseLong(id));

        return booking;
    }

    @RequestMapping(path = "${spring.data.rest.base-path}/bookingsnew/search/findByApartmentId/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Booking> findAllBookingsByApartmentId(@PathVariable(value = "id") String id) {
        List<Booking> bookings = bookingRepository.findByApartmentId(Long.parseLong(id));

        return bookings;
    }

    @RequestMapping(path = "${spring.data.rest.base-path}/bookingsnew/search/findByContractNumber/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Booking> findAllBookingsByContractNumber(@PathVariable(value = "id") String id) {
        List<Booking> bookings = bookingRepository.findByContractNumber(Long.parseLong(id));

        //search in all Bookings from one Customer
        for (Booking booking1: bookings) {
            List<Booking> bookingList = findAllBookingsByApartmentIdAndWeek1(booking1.getApartmentId().toString(), booking1.getWeek1().toString());
            LocalDate today = getToday();
            LocalDate deadline;
            LocalDate saveDate = getToday();
            //search in all Booking from one apartment and the same start week
            for (Booking booking2: bookingList) {
                deadline = getDeadline(booking2);
                LocalDate lastModified = new LocalDate(booking2.getLastModified());
                int months = calcMonthsDifference(today, deadline);
                //only bookings with months <=6 are relevant
                if(months <= 6){
                    //get the oldest modified date, to check, is the booking waiting for 2 weeks
                    saveDate = saveDate.compareTo(lastModified) < 0 ? new LocalDate(lastModified) : saveDate;
                }

            }
            //check if the saveDate has changed
            if (today.compareTo(saveDate) < 0) {
                int weeks = calcWeeksDifference(saveDate, today);
                if (weeks <= 2) {
                    Customer customer = getOldestCustomerByBooking(booking1.getApartmentId().toString(), booking1.getWeek1().toString());
                    if(booking1.getContractNumber().equals(customer.getContractNumber())){
                        booking1.setStatus("Bestätigt");
                    }else{
                        booking1.setStatus("Abgelehnt");
                    }
                }
            }


        }
        return bookings;
    }

    @RequestMapping(path = "${spring.data.rest.base-path}/bookingsnew/search/findByApartmentIdAndWeek/{id}/{week}", method = RequestMethod.GET)
    @ResponseBody
    public List<Booking> findAllBookingsByApartmentIdAndWeek1(@PathVariable(value = "id") String id, @PathVariable(value = "week") String calenderWeek) {
        List<Booking> bookings = bookingRepository.findByApartmentIdAndWeek1(Long.parseLong(id), Integer.parseInt(calenderWeek));

        return bookings;
    }

    @RequestMapping(path = "${spring.data.rest.base-path}/bookingsnew", method = RequestMethod.POST)
    public void addBooking(@RequestBody Booking booking) {
        LocalDate today = getToday();
        LocalDate deadline = getDeadline(booking);
        Booking newBooking = new Booking();
        newBooking.setAdditionalCharge(booking.getAdditionalCharge());
        newBooking.setApartmentId(booking.getApartmentId());
        newBooking.setBookingId(booking.getBookingId());
        newBooking.setContractNumber(booking.getContractNumber());
        newBooking.setPrice(booking.getPrice());
        newBooking.setWeek1(booking.getWeek1());
        newBooking.setWeek2(booking.getWeek2());
        newBooking.setYear(booking.getYear());
        int months = calcMonthsDifference(today, deadline);

        if (months <= 2) {
            newBooking.setStatus("Bestätigt");

        } else if (months <= 12) {
            newBooking.setStatus("Wartend");
            newBooking.setLastModified(getToday().toDate());
        } else {
            // Throw some fancy errors
        }
        bookingRepository.save(newBooking);
        System.out.println("======================================");
        System.out.println(booking);
        System.out.println(today);
        System.out.println(deadline);
        System.out.println(months);
        System.out.println("======================================");
    }

    @RequestMapping(path = "${spring.data.rest.base-path}/bookingsnew/search/findByApartmentIdAndWeek/{id}/{week1}", method = RequestMethod.GET)
    @ResponseBody
    public List<Customer> findAllCustomersByApartmentIdAndWeek1(@PathVariable(value = "id") String id, @PathVariable(value = "week1") String calenderWeek) {
        List<Customer> customers = new ArrayList<Customer>();
        List<Booking> bookings = findAllBookingsByApartmentIdAndWeek1(id, calenderWeek);
        Long contractNumber;
        for (Booking booking:bookings) {
            contractNumber = booking.getContractNumber();
            Customer customer = this.customerRepository.findByContractNumber(contractNumber);
            customers.add(customer);
        }
        return customers;
    }

    /**
     * Get the Customer, with the oldest Booking Date
     * @param id    apartmentID
     * @param calenderWeek  startWeek
     * @return customer
     */
    private Customer getOldestCustomerByBooking(String id, String calenderWeek){
        List<Customer> customers = findAllCustomersByApartmentIdAndWeek1(id, calenderWeek);
        Customer customer = null;
        LocalDate oldestBooking = getToday();
        for (Customer customer1: customers) {
            List<Booking> bookings = findAllBookingsByContractNumber(customer1.getContractNumber().toString());
            for (Booking booking: bookings) {
                if(oldestBooking.compareTo(getDeadline(booking)) < 0){
                    customer = customer1.getCopy();
                }
            }
        }
        return customer;
    }



    private int calcMonthsDifference(LocalDate start, LocalDate end) {
        return Months.monthsBetween(start.withDayOfMonth(1), end.withDayOfMonth(1)).getMonths();
    }
    private int calcWeeksDifference(LocalDate start, LocalDate end) {
        return Weeks.weeksBetween(start, end).getWeeks();
    }


    private LocalDate getDeadline(Booking booking) {
        Calendar calendar = Calendar.getInstance();

        calendar.set(Calendar.YEAR, booking.getYear());
        calendar.set(Calendar.WEEK_OF_YEAR, booking.getWeek1());
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);

        return LocalDate.fromCalendarFields(calendar);
    }


    private LocalDate getToday() {
        return LocalDate.now();
    }
}
