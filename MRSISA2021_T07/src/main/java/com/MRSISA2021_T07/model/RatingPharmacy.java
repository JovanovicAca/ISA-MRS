package com.MRSISA2021_T07.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class RatingPharmacy {
	@Id
	@SequenceGenerator(name = "myPharmacyRatingSeqGen", sequenceName = "myPharmacyRatingSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myPharmacyRatingSeqGen")
	private long id;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	private Pharmacy pharmacy;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	private Patient patient;
	@Column
	private double rating;
	@Column
	private LocalDate ratingDate;
	
	public RatingPharmacy() {
		super();
	}
	
	public RatingPharmacy(long id, Pharmacy pharmacy, Patient patient, int rating, LocalDate ratingDate) {
		super();
		this.id = id;
		this.pharmacy = pharmacy;
		this.patient = patient;
		this.rating = rating;
		this.ratingDate = ratingDate;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Pharmacy getPharmacy() {
		return pharmacy;
	}

	public void setPharmacy(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public LocalDate getRatingDate() {
		return ratingDate;
	}

	public void setRatingDate(LocalDate ratingDate) {
		this.ratingDate = ratingDate;
	}
}
