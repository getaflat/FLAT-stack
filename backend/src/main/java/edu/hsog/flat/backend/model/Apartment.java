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
public class Apartment {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
	private Long id;

	@NonNull
	private Long apartmentId;

	/*@OneToMany(mappedBy = "imageId", targetEntity = Image.class, fetch=FetchType.EAGER)
	private List<Long> images;*/


	//@ManyToOne(targetEntity = ResidentialBlock.class)
	private Long residentialBlockId;

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

	@Lob
	@NonNull
	private String description;

    @Override
    public String toString() {

        return getResidentialBlockId().toString();
    }
}