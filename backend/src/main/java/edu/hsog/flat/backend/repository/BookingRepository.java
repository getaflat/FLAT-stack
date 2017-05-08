package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Booking;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by hauss on 08.05.2017.
 */
public interface BookingRepository extends CrudRepository<Booking, Long> {

}