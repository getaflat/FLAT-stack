package edu.hsog.flat.backend.model;

import lombok.*;

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
	@Getter @Setter private List<Image> images;

	@NonNull
	@Getter @Setter private Long residentialBlockId;

	@NonNull
	@Getter @Setter private Boolean isAvailable;

	@NonNull
	@Getter @Setter private String name;

	@NonNull
	@Getter @Setter private Integer numberOfRooms;

	@Getter @Setter private Double size;

	@NonNull
	@Getter @Setter private Integer numberOfPersons;

	@NonNull
	@Getter @Setter private Integer basePrice;

	@NonNull
	@Getter @Setter private Boolean hasBalcony;

	@NonNull
	@Getter @Setter private Boolean animalsAllowed;

	@NonNull
	@Getter @Setter private Boolean infantsAllowed;
}