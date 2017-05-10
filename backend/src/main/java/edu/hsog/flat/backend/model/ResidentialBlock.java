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
	@Getter @Setter private Long residentialBlockId;

	@OneToMany(mappedBy = "residentialBlockId", targetEntity = Apartment.class, fetch=FetchType.EAGER)
	@Getter @Setter private List<Apartment> apartments;

	@NonNull
	@Getter @Setter private String name;

	@NonNull
	@Getter @Setter private String details;

	@NonNull
	@Lob
	@Getter @Setter private Byte[] image1;

	@Lob
	@Getter @Setter private Byte[] image2;

	@Lob
	@Getter @Setter private Byte[] image3;
}