package edu.hsog.flat.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

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