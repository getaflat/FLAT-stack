package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Apartment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "apartments", path = "apartments")
public interface ApartmentRepository extends PagingAndSortingRepository<Apartment, Long> {
    Apartment findByName(@Param("name") String name);
    List <Apartment> findByResidentialBlockId(@Param("residentialBlockId") String residentialBlockId);
}
