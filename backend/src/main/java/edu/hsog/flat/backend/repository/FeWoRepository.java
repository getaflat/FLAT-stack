package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.FeWo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "FeWo", path = "FeWo")
public interface FeWoRepository extends CrudRepository<FeWo, Long> {
    List<FeWo> findByName(@Param("name") String name);
}