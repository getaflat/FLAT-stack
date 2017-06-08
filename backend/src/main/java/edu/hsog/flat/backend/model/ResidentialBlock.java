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
public class ResidentialBlock {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NonNull
	private Long residentialBlockId;

	/*@OneToMany(mappedBy = "apartmentId", targetEntity = Apartment.class, fetch=FetchType.EAGER)
	private List<Long> apartmentIds;*/

	@NonNull
	private String name;

	@NonNull
	@Lob
	@Column(length = 2048)
	private String details;

	@NonNull
	@Lob
	private byte[] image1;

	@Lob
	private byte[] image2;

	@Lob
	private byte[] image3;

	@Override
	public String toString() {
		return getResidentialBlockId().toString();
	}
}