package edu.hsog.flat.backend.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Data
@RequiredArgsConstructor
public class Image {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long imageId;

	@NonNull
	@ManyToOne (targetEntity = Apartment.class)
	private Long apartmentId;

	@NonNull
	private byte[] image;
}