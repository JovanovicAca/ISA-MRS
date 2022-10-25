package com.MRSISA2021_T07.model;

import javax.persistence.CascadeType;
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
public class DrugReservation {
	
	@Id
	@SequenceGenerator(name = "myDrugReservationSeqGen", sequenceName = "myDrugReservationSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myDrugReservationSeqGen")
	private long id;
	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	private Reservation reservation;
	@ManyToOne(fetch=FetchType.EAGER)
	private Drug drug;
	@Column
	private int amount;
	@Column
	private double price;
	public DrugReservation(Reservation reservation, Drug drug, int amount, double price) {
		super();
		this.reservation = reservation;
		this.drug = drug;
		this.amount = amount;
		this.price = price;
	}
	public DrugReservation() {
		super();
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Reservation getReservation() {
		return reservation;
	}
	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}
	public Drug getDrug() {
		return drug;
	}
	public void setDrug(Drug drug) {
		this.drug = drug;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
}
