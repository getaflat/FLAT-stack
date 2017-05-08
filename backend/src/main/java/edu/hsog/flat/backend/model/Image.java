package edu.hsog.flat.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

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
	private Long apartmentId;

	@NonNull
	@Lob
	private Byte[] image;
}