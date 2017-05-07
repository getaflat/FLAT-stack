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
		// this.repository.save(new Kunde("Katharina", "Schwab", "Teamleiter"));
		// this.repository.save(new Kunde("Carmen", "Schmider", "Frontend"));
		// this.repository.save(new Kunde("Josua", "Weber", "Frontend"));
		// this.repository.save(new Kunde("Tobin", "Choinowski", "Backend"));
		// this.repository.save(new Kunde("Jonas", "Hauß", "Backend"));
	}
}