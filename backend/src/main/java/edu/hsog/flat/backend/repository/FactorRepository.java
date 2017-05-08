package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Factor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "factor", path = "factor")
public interface FactorRepository extends CrudRepository<Factor, Long> {

}
