package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.model.Image;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by hauss on 08.05.2017.
 */
public interface ImageRepository extends CrudRepository<Image, Long> {
    List<Image> findByApartmentId(@Param("apartment_id") Long apartmentId);
}
