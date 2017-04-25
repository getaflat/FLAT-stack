package edu.hsog.flat.backend;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Table(name = "employees")
@Data
@Entity
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

	private Employee() {}

	public Employee(String firstName, String lastName, String description) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.description = description;
	}
}