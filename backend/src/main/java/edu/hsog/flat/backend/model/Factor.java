package edu.hsog.flat.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Factor {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long factorId;

    /*Error: Invocation of init method failed; nested exception is javax.persistence.PersistenceException: [PersistenceUnit: default] Unable to build Hibernate SessionFactory
	@OneToMany(mappedBy = "calenderWeek", targetEntity = Season.class, fetch = FetchType.EAGER)
	private List<Long> calenderWeeks;*/

	@NonNull
	private Double value;
}