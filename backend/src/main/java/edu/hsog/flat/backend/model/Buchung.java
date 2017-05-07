package edu.hsog.flat.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by tobin on 07.05.17.
 */
@Table(name = "Buchung")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Buchung {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "BuchungsID")
    private Long BuchungsID;

    @NotNull
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "Vertragsnummer")
    private Long Vertragsnummer;

    @NotNull
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "FeWoID")
    private Long FeWoID;

    @NotNull
    @Column(name = "Woche1")
    private Integer Woche1;

    @Column(name = "Woche2")
    private Integer Woche2;

    @Column(name = "Woche3")
    private Integer Woche3;

    @Column(name = "Woche4")
    private Integer Woche4;

    @NotNull
    @Column(name = "Preis")
    private Integer Preis;

    @Column(name = "Zuzahlung")
    private Double Zuzahlung;

    @NotNull
    @Column(name = "Status")
    private String Status;


}
