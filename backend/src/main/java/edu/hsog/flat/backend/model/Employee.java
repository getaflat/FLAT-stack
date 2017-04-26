package edu.hsog.flat.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "employees")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

	@NotNull
    @Column(name = "firstName")
	private String firstName;

    @NotNull
    @Column(name = "lastName")
	private String lastName;

    @NotNull
    @Column(name = "description")
	private String description;
}