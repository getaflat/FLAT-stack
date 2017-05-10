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
	@Getter @Setter private Long imageId;

	@NonNull
	@Getter @Setter private Long apartmentId;

	@NonNull
	@Lob
	@Getter @Setter private Byte[] image;
}