package edu.hsog.flat.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {
	private final EmployeeRepository repository;

	@Autowired
	public DatabaseLoader(EmployeeRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Employee("Katharina", "Schwab", "Teamleiter"));
		this.repository.save(new Employee("Carmen", "Schmider", "Frontend"));
		this.repository.save(new Employee("Josua", "Weber", "Frontend"));
		this.repository.save(new Employee("Tobin", "Choinowski", "Backend"));
		this.repository.save(new Employee("Jonas", "Hauß", "Backend"));
	}
}