package edu.hsog.flat.backend.model;

import lombok.*;

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

	@OneToMany(mappedBy = "calenderWeek", targetEntity = Setter.class, fetch = FetchType.EAGER)
	private List<Integer> calenderWeek;

	@NonNull
	private Double value;
}