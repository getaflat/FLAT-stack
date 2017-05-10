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
	private Long imageId;

	@NonNull
	@ManyToOne (targetEntity = Apartment.class, fetch = FetchType.EAGER)
	private Long apartmentId;

	@NonNull
	@Lob
	private Image image;
}