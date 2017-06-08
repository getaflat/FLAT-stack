package edu.hsog.flat.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Rating {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@NonNull
	private Long id;

	/*@NonNull
	@OneToOne(targetEntity = Customer.class, fetch= FetchType.EAGER)
	private Long contractNumber;*/
	@NonNull
	private Long contractNumber;

	@NonNull
	private Double score;

	private String comment;
}