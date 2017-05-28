package edu.hsog.flat.backend.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Apartment {
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Id
	private Long apartmentId;

	@OneToMany(mappedBy = "imageId", targetEntity = Image.class, fetch=FetchType.EAGER)
	private List<Long> images;


	/*@ManyToOne(targetEntity = ResidentialBlock.class)
	@JoinColumn(name="residential_Block_Id")
	private Long residentialBlockId;*/

	@NonNull
	private Boolean isAvailable;

	@NonNull
	private String name;

	@NonNull
	private Integer numberOfRooms;

	private Double size;

	@NonNull
	private Integer numberOfPersons;

	@NonNull
	private Integer basePrice;

	@NonNull
	private Boolean hasBalcony;

	@NonNull
	private Boolean animalsAllowed;

	@NonNull
	private Boolean infantsAllowed;

	@NonNull
	private String description;
}