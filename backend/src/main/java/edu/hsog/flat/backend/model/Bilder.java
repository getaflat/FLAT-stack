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
@Table(name = "Bilder")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Bilder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "BildID")
    private Long BildID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FeWoID")
    private Long FeWoID;

    @NotNull
    @Column(name = "Bild")
    private Image Bild;

}
