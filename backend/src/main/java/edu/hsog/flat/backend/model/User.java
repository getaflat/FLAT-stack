package edu.hsog.flat.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

	@NotNull
    @Column(name = "username")
	private String username;

    @NotNull
    @Column(name = "birtdate")
	private String birtdate;

    @NotNull
    @Column(name = "password")
	private String password;

    @NotNull
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "contractnumber")
    private String contractnumber;
}