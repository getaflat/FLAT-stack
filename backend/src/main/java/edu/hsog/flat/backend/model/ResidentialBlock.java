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
    //@GeneratedValue(strategy = GenerationType.AUTO)
	private Long residentialBlockId;

	/*@OneToMany(mappedBy = "apartmentId", targetEntity = Apartment.class, fetch=FetchType.EAGER)
	private List<Long> apartmentIds;*/

	@NonNull
	private String name;

	@NonNull
	private String details;

	@NonNull
	@Lob
	private byte[] image1;

	@Lob
	private byte[] image2;

	@Lob
	private byte[] image3;
}