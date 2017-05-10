package edu.hsog.flat.backend.model;

import lombok.*;

import org.hibernate.validator.constraints.Email;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Customer {
	@Id
	@NonNull
	@Getter @Setter private Long contractNumber;

	@OneToMany(mappedBy = "contractNumber", targetEntity = Rating.class, fetch= FetchType.EAGER)
	@Getter @Setter private List<Rating> ratings;

	@NonNull
	@Getter @Setter private String lastName;

	@NonNull
	@Getter @Setter private String firstName;

	@NonNull
	@Getter @Setter private Date dateOfBirth;

	@Email
	@Getter @Setter private String email;

	@Getter @Setter private String username;
	@Getter @Setter private String password;
	@Getter @Setter private Integer totalScore;
}