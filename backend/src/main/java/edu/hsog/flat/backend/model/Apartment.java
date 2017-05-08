package edu.hsog.flat.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Apartment {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long apartmentId;

	@OneToMany(mappedBy = "apartmentId", targetEntity = Image.class, fetch=FetchType.EAGER)
	private List<Image> images;

	@NonNull
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
}