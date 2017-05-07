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
@Table(name = "Komplex")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Komplex {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "KomplexID")
    private Long KomplexID;

    @NotNull
    @Column(name = "Name")
    private String Name;

    @NotNull
    @Column(name = "Details")
    private String Details;

    @NotNull
    @Column(name = "Bild1")
    private Image Bild1;

    @Column(name = "Bild2")
    private Image Bild2;

    @Column(name = "Bild3")
    private Image Bild3;



}

