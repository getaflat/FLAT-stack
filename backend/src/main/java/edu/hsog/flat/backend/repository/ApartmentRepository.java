package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Apartment;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by hauss on 08.05.2017.
 */
public interface ApartmentRepository extends CrudRepository<Apartment, Long> {

}