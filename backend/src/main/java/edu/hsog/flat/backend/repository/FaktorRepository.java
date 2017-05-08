package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Faktor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "Faktor", path = "Faktor")
public interface FaktorRepository extends CrudRepository<Faktor, Long> {
    List<Faktor> findByFaktor(@Param("name") String name);
}