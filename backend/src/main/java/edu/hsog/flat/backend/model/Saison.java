package edu.hsog.flat.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.awt.*;
import java.util.Set;

/**
 * Created by tobin on 07.05.17.
 */
@Table(name = "Saison")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Saison {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "KW")
    private Integer KW;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Faktor.class)
    @JoinColumn(name = "FaktorID")
    private Set<Long> FaktorID;




}
