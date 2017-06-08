package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Rating;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "ratings", path = "ratings")
public interface RatingRepository extends CrudRepository<Rating, Long> {
    Rating findByContractNumber(@Param("contractNumber") Long contractNumber);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "INSERT into rating(comment, score, contract_number) VALUES (?1, ?2, ?3)", nativeQuery = true)
    Integer postRating(@Param("comment") String comment, @Param("score") Double score, @Param("contractNumber") Long contractNumber);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "DROP TABLE rating", nativeQuery = true)
    Integer dropTable();

}
