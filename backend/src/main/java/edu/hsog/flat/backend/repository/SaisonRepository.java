package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Saison;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "Saison", path = "Saison")
public interface SaisonRepository extends CrudRepository<Saison, Long> {
    List<Saison> findByKW(@Param("name") String name);
}