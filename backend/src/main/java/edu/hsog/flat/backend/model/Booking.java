package edu.hsog.flat.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Booking {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@NonNull
	private Long id;

	@NonNull
	private Long bookingId;

	private Date lastModified;

	@NonNull
	//@ManyToOne(targetEntity = Customer.class)
	private Long contractNumber;

	@NonNull
    //@ManyToOne(targetEntity = Apartment.class)
	private Long apartmentId;

	@NonNull
    //@ManyToOne(targetEntity = Season.class)
	private Integer week1;

    //@ManyToOne(targetEntity = Season.class)
    private Integer week2;

    private Integer year;

	@NonNull
	private Integer price;

	@NonNull
	private Double additionalCharge;

	@NonNull
	private String status;
}