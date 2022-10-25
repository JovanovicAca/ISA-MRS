package com.MRSISA2021_T07.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import org.springframework.beans.factory.annotation.Autowired;

import com.MRSISA2021_T07.repository.LoyaltyRepository;
import com.MRSISA2021_T07.repository.SupplierRepository;

@Entity
public class Loyalty {
	
	// U: newAppointment.js, reservePharmacist.js, patientMedication.js
	// loyal.findAll() ne radi
	@Id
	@SequenceGenerator(name = "loyaltySeqGen", sequenceName = "loyaltySeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "loyaltySeqGen")
	private long id;

	@OneToOne
	private Patient user;

	@Column
	private int points; // Poeni od korisnika
	@Column
	private String rank; // Rank iz loyaltyRule

	@Column
	private int discount; // Popust koji korisnik ostvaruje

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Patient getUser() {
		return user;
	}

	public void setUser(Patient user) {
		this.user = user;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public String getRank() {
		return rank;
	}

	public void setRank(String rank) {
		this.rank = rank;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public Loyalty() {

	}

}
