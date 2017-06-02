package edu.hsog.flat.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.*;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Rating {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NonNull
	private Long id;

	@NonNull
	private Long ratingId;

	/*@NonNull
	@OneToOne(targetEntity = Customer.class, fetch= FetchType.EAGER)
	private Long contractNumber;*/
	@NonNull
	private Long contractNumber;

	@NonNull
	private Double score;

	private String comment;
}