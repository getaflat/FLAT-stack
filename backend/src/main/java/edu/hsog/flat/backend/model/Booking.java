package edu.hsog.flat.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Booking {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long bookingId;

	@NotNull
	private Long contractNumber;

	@NotNull
	private Long aparmentId;

	@NotNull
	private Integer week1;
	
	private Integer week2;
	private Integer week3;
	private Integer week4;

	@NotNull
	private Integer price;

	private Float additionalCharge;

	@NotNull
	private String status;
}