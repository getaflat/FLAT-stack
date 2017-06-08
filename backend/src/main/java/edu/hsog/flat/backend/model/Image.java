package edu.hsog.flat.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;


@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Image {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@NonNull
	private Long id;

	@NonNull
	private Long imageId;

	@NonNull
	//@ManyToOne (targetEntity = Apartment.class)
	private Long apartmentId;

	@NonNull
	@Lob
	private byte[] image;
}