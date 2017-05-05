package edu.hsog.flat.backend;

import edu.hsog.flat.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {
	private final UserRepository repository;

	@Autowired
	public DatabaseLoader(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		// this.repository.save(new User("Katharina", "Schwab", "Teamleiter"));
		// this.repository.save(new User("Carmen", "Schmider", "Frontend"));
		// this.repository.save(new User("Josua", "Weber", "Frontend"));
		// this.repository.save(new User("Tobin", "Choinowski", "Backend"));
		// this.repository.save(new User("Jonas", "Hauß", "Backend"));
	}
}