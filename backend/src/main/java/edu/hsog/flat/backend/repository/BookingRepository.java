package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "bookings", path = "bookings")
public interface BookingRepository extends CrudRepository<Booking, Long> {
    List<Booking> findByContractNumber(@Param("contractNumber") Long contractNumber);
    Booking findByBookingId(@Param("bookingId") Long bookingId);
    List<Booking> findByApartmentId(@Param("apartmentId") Long apartmentId);
    List<Booking> findAll();
}