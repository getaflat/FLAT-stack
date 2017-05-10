package edu.hsog.flat.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.*;

@Entity
public class Season {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Getter @Setter private Integer calenderWeek;


	@Getter @Setter private Long factorId;
}