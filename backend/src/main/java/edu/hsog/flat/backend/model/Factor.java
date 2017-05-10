package edu.hsog.flat.backend.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Factor {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Getter @Setter private Long factorId;

	@NonNull
	private Double value;
}