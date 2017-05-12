package edu.hsog.flat.backend.model;

import lombok.*;

import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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

	@OneToMany(mappedBy = "bookingId", targetEntity = Booking.class, fetch=FetchType.EAGER)
	private List<Long> bookingIds;

	private String lastName;

	private String firstName;

	private Date dateOfBirth;

	private String email;

	private String username;
	private String password;
	private Integer totalScore;
}