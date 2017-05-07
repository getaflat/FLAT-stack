package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Kunde;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface UserRepository extends CrudRepository<Kunde, Long> {
    List<Kunde> findByusername(@Param("name") String name);
}