package edu.hsog.flat.backend.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class ResidentialBlock {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long residentialBlockId;

	@OneToMany(mappedBy = "residentialBlockId", targetEntity = Apartment.class, fetch=FetchType.EAGER)
	private List<Apartment> apartments;

	@NonNull
	private String name;

	@NonNull
	private String details;

	@NonNull
	@Lob
	private Image image1;

	@Lob
	private Image image2;

	@Lob
	private Image image3;
}