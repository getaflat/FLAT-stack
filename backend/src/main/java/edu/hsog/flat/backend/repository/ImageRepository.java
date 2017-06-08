package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Image;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "images", path = "images")
public interface ImageRepository extends CrudRepository<Image, Long> {
    List<Image> findByApartmentId(@Param("apartmentId") Long apartmentId);


    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "DROP TABLE image", nativeQuery = true)
    Integer dropTable();

}
