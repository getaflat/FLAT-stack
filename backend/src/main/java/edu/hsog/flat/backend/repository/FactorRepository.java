package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Factor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "factors", path = "factors")
public interface FactorRepository extends CrudRepository<Factor, Long> {
    Factor findByFactorId(@Param("factorId") Long factorId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "DROP TABLE factor", nativeQuery = true)
    Integer dropTable();

}
