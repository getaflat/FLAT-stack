package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Apartment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "apartments", path = "apartments")
public interface ApartmentRepository extends CrudRepository<Apartment, Long> {

}
