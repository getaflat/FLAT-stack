package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Factor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "factors", path = "factors")
public interface FactorRepository extends CrudRepository<Factor, Long> {
    Factor findByFactorId(@Param("factorId") Long factorId);
    /*
    SELECT *
    FROM season
    INNER JOIN factor ON season.factor_id = factor.factor_id
    WHERE season.cleander_week = ?;
    */

    @Query(value = "SELECT factor.factor FROM season INNER JOIN factor ON (season.factor_id = factor.factor_id) WHERE season.calender_week = ?", nativeQuery = true)
    int findByCalenderWeek(@Param("calenderWeek") int calenderWeek);
}
