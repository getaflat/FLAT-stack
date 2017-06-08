package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Season;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "seasons", path = "seasons")
public interface SeasonRepository extends CrudRepository<Season, Long> {
    Season findByCalenderWeek(@Param("calenderWeek") Long calenderWeek);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "DROP TABLE season", nativeQuery = true)
    Integer dropTable();
}
