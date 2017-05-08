package edu.hsog.flat.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Created by tobin on 07.05.17.
 */

@Table(name = "Kunde")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Kunde {
	@Id
    @Column(name = "Vetragsnummer")
    private Long Vertragsnummer;

	@NotNull
    @Column(name = "Nachname")
	private String Nachname;

    @NotNull
    @Column(name = "Vorname")
	private String Vorname;

    @Column(name = "Email")
	private String Email;

    @NotNull
    @Column(name = "Geburtsdatum")
    private Date Geburtsdatum;

    @Column(name = "Username")
    private String Username;

    @Column(name = "Passwort")
    private String Passwort;

    @Column(name = "Punktestand")
    private Integer Punktestand;

}