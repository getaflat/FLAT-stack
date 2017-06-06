package edu.hsog.flat.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString(exclude = "password")
@RequiredArgsConstructor
@NoArgsConstructor
public class Customer {
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

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@NonNull
	private String password;

	private Integer totalScore;

	public Customer getCopy(){
	    Customer c = new Customer();
	    c.setContractNumber(this.getContractNumber());
	    c.setLastName(this.getLastName());
	    c.setFirstName(this.getFirstName());
	    c.setDateOfBirth(this.getDateOfBirth());
	    c.setEmail(this.getEmail());
	    c.setPassword(this.getPassword());
	    c.setTotalScore(this.getTotalScore());
	    return c;
    }
}