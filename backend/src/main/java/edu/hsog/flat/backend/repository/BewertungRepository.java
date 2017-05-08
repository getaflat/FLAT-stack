package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Bewertung;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "Bewertung", path = "Bewertung")
public interface BewertungRepository extends CrudRepository<Bewertung, Long> {
    List<Bewertung> findByVertragsnummer(@Param("name") String name);
}