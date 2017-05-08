package edu.hsog.flat.backend.repository;

import edu.hsog.flat.backend.model.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by hauss on 08.05.2017.
 */
public interface CustomerRepository extends CrudRepository<Customer, Long> {
    Customer findByContractNumber(@Param("contract_number") Long contractNumber);
    // List<Customer> findByLastName(String lastName);
}
