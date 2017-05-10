package edu.hsog.flat.backend.model;

import javax.persistence.*;

import lombok.*;

@Entity
@Data
@RequiredArgsConstructor
public class Season {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer calenderWeek;

	@ManyToOne(targetEntity = Factor.class, fetch = FetchType.EAGER)
	private Long factorId;
}