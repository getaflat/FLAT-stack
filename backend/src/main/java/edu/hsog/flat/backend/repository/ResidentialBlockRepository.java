package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Apartment;
import edu.hsog.flat.backend.model.ResidentialBlock;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "residential-blocks", path = "residential-blocks")
public interface ResidentialBlockRepository extends CrudRepository<ResidentialBlock, Long> {
    ResidentialBlock findByName(@Param("name") String name);
}
