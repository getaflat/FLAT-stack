package edu.hsog.flat.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Rating {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long ratingId;

	@NotNull
	private Long contractNumber;

	@NotNull
	private Double score;

	private String comment;
}