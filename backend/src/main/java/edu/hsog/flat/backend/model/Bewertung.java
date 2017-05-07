package edu.hsog.flat.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.awt.*;

/**
 * Created by tobin on 07.05.17.
 */
@Table(name = "Bewertung")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Bewertung {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "BewertungsID")
    private Long BewertungsID;

    @NotNull
    @Column(name = "Vertragsnummer")
    private Long Vertragsnummer;

    @NotNull
    @Column(name = "Punkte")
    private Double Punkte;

    @Column(name = "Kommentar")
    private String Kommentar;




}
