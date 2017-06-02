package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Customer;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
public interface CustomerRepository extends CrudRepository<Customer, Long> {
    Customer findByContractNumber(@Param("contractNumber") Long contractNumber);
    Customer findByLastName(@Param("lastName") String lastName);
    Customer findByEmail(@Param("email") String email);

    @Modifying(clearAutomatically = true)
    @Query("update Customer b set b.firstName = ?1, b.lastName = ?2 where b.contractNumber = ?3")
    int setUpdatedCustomer(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("contractNumber") Long contractNumber);


}
