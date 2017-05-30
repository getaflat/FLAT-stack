package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "bookings", path = "bookings")
public interface BookingRepository extends CrudRepository<Booking, Long> {
    Booking[] findBycontractNumber(@Param("contractNumber") Long contractNumber);

}