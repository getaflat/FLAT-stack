package edu.hsog.flat.backend.model;

import lombok.*;

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
	@ManyToOne(targetEntity = Customer.class, fetch= FetchType.EAGER)
	private Long contractNumber;

	@NonNull
    @ManyToOne(targetEntity = Apartment.class, fetch =  FetchType.EAGER)
	private Long aparmentId;

	@NonNull
    @ManyToOne(targetEntity = Season.class, fetch = FetchType.EAGER)
	private Integer week1;

    @ManyToOne(targetEntity = Season.class, fetch = FetchType.EAGER)
    private Integer week2;

    @ManyToOne(targetEntity = Season.class, fetch = FetchType.EAGER)
	private Integer week3;

    @ManyToOne(targetEntity = Season.class, fetch = FetchType.EAGER)
	private Integer week4;

	@NonNull
	private Integer price;

	private Float additionalCharge;

	@NonNull
	private String status;
}