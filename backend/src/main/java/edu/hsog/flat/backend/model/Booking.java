package edu.hsog.flat.backend.model;

import lombok.*;

import javax.persistence.*;

@Entity
public class Booking {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Getter @Setter private Long bookingId;

	@NonNull
	@Getter @Setter private Long contractNumber;

	@NonNull
	@Getter @Setter private Long aparmentId;

	@NonNull
	@Getter @Setter private Integer week1;

	@Getter @Setter private Integer week2;
	@Getter @Setter private Integer week3;
	@Getter @Setter private Integer week4;

	@NonNull
	@Getter @Setter private Integer price;

	@Getter @Setter private Float additionalCharge;

	@NonNull
	@Getter @Setter private String status;
}