package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Bilder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "Bilder", path = "Bilder")
public interface BilderRepository extends CrudRepository<Bilder, Long> {
    List<Bilder> findByFeWoID(@Param("name") String name);
}