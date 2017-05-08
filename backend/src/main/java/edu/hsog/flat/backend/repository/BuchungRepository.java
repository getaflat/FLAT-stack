package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Buchung;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "Buchung", path = "Buchung")
public interface BuchungRepository extends CrudRepository<Buchung, Long> {
    List<Buchung> findByVertragsnummer(@Param("name") String name);
}