package edu.hsog.flat.backend.model;

import javax.persistence.*;

import lombok.*;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Season {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NonNull
	private Long id;

	@NonNull
	private Long calenderWeek;


	//@ManyToOne(targetEntity = Factor.class)
	private Long factorId;
}