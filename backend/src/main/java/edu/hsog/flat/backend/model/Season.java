package edu.hsog.flat.backend.model;

import javax.persistence.*;

import lombok.*;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Season {
	@Id
    @NonNull
	private Long calenderWeek;


	//@ManyToOne(targetEntity = Factor.class)
	private Long factorId;
}