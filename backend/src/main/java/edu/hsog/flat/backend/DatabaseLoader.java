package edu.hsog.flat.backend;

import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DatabaseLoader implements CommandLineRunner {
	private final CustomerRepository cRepository;

	@Autowired
	public DatabaseLoader(CustomerRepository cRepository) {
		this.cRepository = cRepository;
	}

	@Override
	public void run(String... strings) throws Exception {
		Customer c = new Customer();
		/* c.setContractNumber(123456789001L);
		 this.cRepository.save(c);
		c.setContractNumber(123456789002L);
		 this.cRepository.save(c);
		c.setContractNumber(123456789003L);
		this.cRepository.save(c);
		c.setContractNumber(123456789004L);
		this.cRepository.save(c);
		c.setContractNumber(123456789005L);
		this.cRepository.save(c);
		c.setContractNumber(123456789006L);
		this.cRepository.save(c);
		c.setContractNumber(123456789008L);
		this.cRepository.save(c);
		c.setContractNumber(123456789009L);
		this.cRepository.save(c);
		c.setContractNumber(123456789010L);
		this.cRepository.save(c); */

		c.setContractNumber(123456789011L);
		c.setLastName("Testico1");
		c.setFirstName("Test1");
		c.setEmail("Test1.Testico1@go.de");
		c.setUsername("testi1");
		c.setDateOfBirth(new Date(91, 0, 1));
		c.setPassword("test1");
		c.setTotalScore(400);
		this.cRepository.save(c);

        c.setContractNumber(123456789012L);
        c.setLastName("Testico2");
        c.setFirstName("Test2");
        c.setEmail("Test2.Testico2@go.de");
        c.setUsername("testi2");
        c.setDateOfBirth(new Date(92, 1, 2));
        c.setPassword("test2");
        c.setTotalScore(500);
        this.cRepository.save(c);

        c.setContractNumber(123456789013L);
        c.setLastName("Testico3");
        c.setFirstName("Test3");
        c.setEmail("Test3.Testico3@go.de");
        c.setUsername("testi3");
        c.setDateOfBirth(new Date(93, 2, 3));
        c.setPassword("test3");
        c.setTotalScore(600);
        this.cRepository.save(c);

        c.setContractNumber(123456789014L);
        c.setLastName("Testico4");
        c.setFirstName("Test4");
        c.setEmail("Test4.Testico4@go.de");
        c.setUsername("testi4");
        c.setDateOfBirth(new Date(94, 3, 4));
        c.setPassword("test4");
        c.setTotalScore(700);
        this.cRepository.save(c);

        c.setContractNumber(123456789015L);
        c.setLastName("Testico5");
        c.setFirstName("Test5");
        c.setEmail("Test5.Testico5@go.de");
        c.setUsername("testi5");
        c.setDateOfBirth(new Date(95, 4, 5));
        c.setPassword("test5");
        c.setTotalScore(800);
        this.cRepository.save(c);

        c.setContractNumber(123456789016L);
        c.setLastName("Testico6");
        c.setFirstName("Test6");
        c.setEmail("Test6.Testico6@go.de");
        c.setUsername("testi6");
        c.setDateOfBirth(new Date(96, 5, 6));
        c.setPassword("test6");
        c.setTotalScore(300);
        this.cRepository.save(c);

        c.setContractNumber(123456789017L);
        c.setLastName("Testico7");
        c.setFirstName("Test7");
        c.setEmail("Test7.Testico7@go.de");
        c.setUsername("testi7");
        c.setDateOfBirth(new Date(97, 6, 7));
        c.setPassword("test7");
        c.setTotalScore(200);
        this.cRepository.save(c);

        c.setContractNumber(123456789018L);
        c.setLastName("Testico8");
        c.setFirstName("Test8");
        c.setEmail("Test8.Testico8@go.de");
        c.setUsername("testi8");
        c.setDateOfBirth(new Date(98, 7, 8));
        c.setPassword("test8");
        c.setTotalScore(800);
        this.cRepository.save(c);

        c.setContractNumber(123456789019L);
        c.setLastName("Testico9");
        c.setFirstName("Test9");
        c.setEmail("Test9.Testico9@go.de");
        c.setUsername("testi9");
        c.setDateOfBirth(new Date(99, 8, 9));
        c.setPassword("test9");
        c.setTotalScore(1000);
        this.cRepository.save(c);
	}
}