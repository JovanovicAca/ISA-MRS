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
public class RatingDrug {
	@Id
	@SequenceGenerator(name = "myDrugRatingSeqGen", sequenceName = "myDrugRatingSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myDrugRatingSeqGen")
	private long id;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	private Drug drug;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	private Patient patient;
	@Column
	private double rating;
	@Column
	private LocalDate ratingDate;
	
	public RatingDrug() {
		super();
	}

	public RatingDrug(long id, Drug drug, Patient patient, int rating, LocalDate ratingDate) {
		super();
		this.id = id;
		this.drug = drug;
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

	public Drug getDrug() {
		return drug;
	}

	public void setDrug(Drug drug) {
		this.drug = drug;
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
