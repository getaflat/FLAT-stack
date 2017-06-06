package edu.hsog.flat.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import org.hibernate.validator.constraints.Email;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Data
@ToString(exclude = "password")
@RequiredArgsConstructor
@NoArgsConstructor
public class Customer {
	@JsonIgnore
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@NonNull
	private Long id;

	@NonNull
	private Long contractNumber;

	/*@OneToMany(mappedBy = "bookingId", targetEntity = Booking.class, fetch=FetchType.EAGER)
	private List<Long> bookingIds;*/

	private String lastName;

	private String firstName;

	private Date dateOfBirth;

	@Column(unique=true)
	private String email;

	private String username;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@NonNull
	private String password;

	private Integer totalScore;
}