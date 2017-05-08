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
@Table(name = "Faktor")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Faktor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "FaktorID")
    private Long FaktorID;

    @NotNull
    @Column(name = "Faktor")
    private Double Faktor;




}