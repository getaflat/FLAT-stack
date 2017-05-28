package edu.hsog.flat.backend.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Image {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@NonNull
	private Long imageId;

	@NonNull
	//@ManyToOne (targetEntity = Apartment.class)
	private Long apartmentId;

	@NonNull
	@Lob
	private byte[] image;
}