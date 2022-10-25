package com.MRSISA2021_T07.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class DrugOrderPatient {
	@Id
	@SequenceGenerator(name = "myDrugOrederSeqGen", sequenceName = "myDrugOrederSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myDrugOrederSeqGen")
	private long id;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	private Drug drug;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	private Pharmacy pharmacy;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	private Patient patient;
	@Column
	private LocalDate startDate;
	@Column
	private boolean recived;
	@Column
	private LocalDate recivingDate;
	@Column
	private int quantity;
	@Column
	private double price;
	@Column
	private boolean canceled;
	
	public DrugOrderPatient() {
		
	}
	
	public boolean isCanceled() {
		return canceled;
	}
	public void setCanceled(boolean canceled) {
		this.canceled = canceled;
	}
	public boolean isRecived() {
		return recived;
	}
	public void setRecived(boolean recived) {
		this.recived = recived;
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
	public Pharmacy getPharmacy() {
		return pharmacy;
	}
	public void setPharmacy(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getRecivingDate() {
		return recivingDate;
	}
	public void setRecivingDate(LocalDate recivingDate) {
		this.recivingDate = recivingDate;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
}
