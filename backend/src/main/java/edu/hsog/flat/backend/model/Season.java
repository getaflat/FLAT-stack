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
	private Long calenderWeek;

	@NonNull
	@ManyToOne(targetEntity = Factor.class)
	private Long factorId;
}