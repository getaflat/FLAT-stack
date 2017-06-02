package edu.hsog.flat.backend.controller;

import edu.hsog.flat.backend.model.Booking;
import edu.hsog.flat.backend.repository.ApartmentRepository;
import edu.hsog.flat.backend.repository.BookingRepository;
import org.apache.tomcat.jni.Local;
import org.joda.time.LocalDate;
import org.joda.time.Months;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Controller
public class BookingController {
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    ApartmentRepository apartmentRepository;

    BookingController(BookingRepository bookingRepository, ApartmentRepository apartmentRepository) {
        this.bookingRepository = bookingRepository;
        this.apartmentRepository = apartmentRepository;
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

        return bookings;
    }

    @RequestMapping(path = "${spring.data.rest.base-path}/bookingsnew", method = RequestMethod.POST)
    public void addBooking(@RequestBody Booking booking) {
        LocalDate today = getToday();
        LocalDate deadline = getDeadline(booking);

        int months = calcMonthsDifference(today, deadline);

        if (months <= 2) {
            booking.setStatus("Bestätigt");
            // Ok + evtl. Daten zurücksenden
        } else if (months <= 6) {

        } else if (months <= 12) {
            // Warten bis 6 Monate davor =>
        } else {
            // Throw some fancy errors
        }

        System.out.println("======================================");
        System.out.println(booking);
        System.out.println(today);
        System.out.println(deadline);
        System.out.println(months);
        System.out.println("======================================");
    }

    private int calcMonthsDifference(LocalDate start, LocalDate end) {
        return Months.monthsBetween(start.withDayOfMonth(1), end.withDayOfMonth(1)).getMonths();
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
