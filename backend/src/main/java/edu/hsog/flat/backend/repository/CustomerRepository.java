package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Customer;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by hauss on 08.05.2017.
 */
@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
public interface CustomerRepository extends CrudRepository<Customer, Long> {
    Customer findByContractNumber(@Param("contractNumber") Long contractNumber);
    Customer findByLastName(@Param("lastName") String lastName);
    Customer findByEmail(@Param("email") String email);
    List<Customer> findAll();

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update customer b set b.first_name= :firstName, b.last_name= :lastName where contract_number= :contractNumber", nativeQuery = true)
    Integer updateCustomer(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("contractNumber") Long contractNumber);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "DROP TABLE customer", nativeQuery = true)
    Integer dropTable();

}
