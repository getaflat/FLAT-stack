package edu.hsog.flat.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import lombok.RequiredArgsConstructor;
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
	private Long contractNumber;

	@OneToMany(mappedBy = "contractNumber", targetEntity = Rating.class, fetch= FetchType.EAGER)
	private List<Rating> ratings;

	@NonNull
	private String lastName;

	@NonNull
	private String firstName;

	@NonNull
	private Date dateOfBirth;

	@Email
	private String email;

	private String username;
	private String password;
	private Integer totalScore;
}