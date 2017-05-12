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
public class Booking {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long bookingId;

	@NonNull
	@ManyToOne(targetEntity = Customer.class)
	private Long contractNumber;

	@NonNull
    @ManyToOne(targetEntity = Apartment.class)
	private Long apartmentId;

	@NonNull
    @ManyToOne(targetEntity = Season.class)
	private Integer week1;

    @ManyToOne(targetEntity = Season.class)
    private Integer week2;

    @ManyToOne(targetEntity = Season.class)
	private Integer week3;

    @ManyToOne(targetEntity = Season.class)
	private Integer week4;

	@NonNull
	private Integer price;

	private Double additionalCharge;

	@NonNull
	private String status;
}