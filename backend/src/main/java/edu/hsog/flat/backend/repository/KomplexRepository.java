package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Komplex;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "Komplex", path = "Komplex")
public interface KomplexRepository extends CrudRepository<Komplex, Long> {
    List<Komplex> findByName(@Param("name") String name);
}