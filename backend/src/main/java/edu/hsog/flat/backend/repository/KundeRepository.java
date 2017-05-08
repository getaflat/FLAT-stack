package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Kunde;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "Kunde", path = "Kunde")
public interface KundeRepository extends CrudRepository<Kunde, Long> {
    List<Kunde> findByVertragsnummer(@Param("name") String name);
}