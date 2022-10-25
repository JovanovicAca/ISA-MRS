package com.MRSISA2021_T07.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class LoyaltyRule { // Rank koji cemo koristiti
	
	@Id
	@SequenceGenerator(name = "loyaltyruleSeqGen", sequenceName = "loyaltyruleSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "loyaltyruleSeqGen")
	private long id;

	// Klasa gde admin setuje pravila za lojalnost u sistemu, koje ce loyalty klasa prati
	@Column
	private int lowPoints; // Donja granica OVOG pravila u sistemu

	@Column
	private int highPoints; // Gornja granica OVOG pravila u sistemu

	@Column
	private String rank; // Ime ranka

	@Column
	private int discount; // Popust koji ide sa rankom

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public int getLowPoints() {
		return lowPoints;
	}

	public void setLowPoints(int lowPoints) {
		this.lowPoints = lowPoints;
	}

	public int getHighPoints() {
		return highPoints;
	}

	public void setHighPoints(int highPoints) {
		this.highPoints = highPoints;
	}

	public LoyaltyRule() {

	}
}
