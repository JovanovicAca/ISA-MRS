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

@Entity 
public class DrugPharmacy {
	
	@Id
	@SequenceGenerator(name = "drugPharmaSeqGen", sequenceName = "drugPharmaSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "drugPharmaSeqGen")
	private long id;
	@ManyToOne(fetch = FetchType.EAGER)
	private Drug drug;
	@ManyToOne(fetch = FetchType.EAGER)
	private Pharmacy pharmacy;
	@Column
	private double amount;
	@Column
	private double price;
	@Column
	private LocalDate startPrice;
	@Column
	private LocalDate endPrice;
	@Column
	private Double actionPrice;
	@Column
	private LocalDate startActionPrice;
	@Column
	private LocalDate endActionPrice;
	
	public DrugPharmacy() {
		super();
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Drug getDrug() {
		return drug;
	}
	public void setDrug(Drug drug) {
		this.drug = drug;
	}
	public Pharmacy getPharma() {
		return pharmacy;
	}
	public void setPharma(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}
	public Pharmacy getPharmacy() {
		return pharmacy;
	}
	public void setPharmacy(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}
	public LocalDate getStartPrice() {
		return startPrice;
	}
	public void setStartPrice(LocalDate startPrice) {
		this.startPrice = startPrice;
	}
	public LocalDate getEndPrice() {
		return endPrice;
	}
	public void setEndPrice(LocalDate endPrice) {
		this.endPrice = endPrice;
	}
	public double getActionPrice() {
		if(actionPrice == null)
			actionPrice = (double) 0;
		return actionPrice;
	}
	public void setActionPrice(double actionPrice) {
		this.actionPrice = actionPrice;
	}
	public LocalDate getStartActionPrice() {
		return startActionPrice;
	}
	public void setStartActionPrice(LocalDate startActionPrice) {
		this.startActionPrice = startActionPrice;
	}
	public LocalDate getEndActionPrice() {
		return endActionPrice;
	}
	public void setEndActionPrice(LocalDate endActionPrice) {
		this.endActionPrice = endActionPrice;
	}
	
	
}
