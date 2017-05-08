package edu.hsog.flat.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by tobin on 07.05.17.
 */
@Table(name = "FeWo")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FeWo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "FeWoID")
    private Long FeWoID;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "KomplexID")
    private Long KomplexID;

    @NotNull
    @Column(name = "Verfuegbar")
    private Boolean Verfuegbar;

    @NotNull
    @Column(name = "Name")
    private String Name;

    @NotNull
    @Column(name = "Zimmeranzahl")
    private Integer Zimmeranzahl;

    @Column(name = "Groesse")
    private Double Groesse;

    @NotNull
    @Column(name = "Personenanzahl")
    private Integer Personenanzahl;

    @NotNull
    @Column(name = "Grundpreis")
    private Integer Grundpreis;

    @NotNull
    @Column(name = "Balkon")
    private Boolean Balkon;

    @NotNull
    @Column(name = "Tiere")
    private Boolean Tiere;

    @NotNull
    @Column(name = "Kleinkind")
    private boolean Kleinkind;


}
