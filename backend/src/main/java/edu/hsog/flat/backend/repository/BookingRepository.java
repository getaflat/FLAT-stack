package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Booking;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@RepositoryRestResource(collectionResourceRel = "bookings", path = "bookings")
public interface BookingRepository extends CrudRepository<Booking, Long> {
    List<Booking> findByContractNumber(@Param("contractNumber") Long contractNumber);
    Booking findByBookingId(@Param("bookingId") Long bookingId);
    List<Booking> findByApartmentId(@Param("apartmentId") Long apartmentId);
    List<Booking> findAll();

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "DELETE from booking where contract_number= :contractNumber", nativeQuery = true)
    Integer deleteBooking(@Param("contractNumber") Long contractNumber);
}