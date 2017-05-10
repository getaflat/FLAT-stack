package edu.hsog.flat.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import lombok.*;

@Entity
public class Rating {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Getter @Setter private Long ratingId;

	@NonNull
	@Getter @Setter private Long contractNumber;

	@NonNull
	@Getter @Setter private Double score;

	@Getter @Setter private String comment;
}