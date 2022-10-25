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

@Entity
public class Subscribe {
	
	@Id
	@SequenceGenerator(name = "subscribeSeqGen", sequenceName = "subscribeSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "subscribeSeqGen")
	private long id;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	private Patient patient;
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	private Pharmacy pharmacy;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public Pharmacy getPharmacy() {
		return pharmacy;
	}
	public void setPharmacy(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}
	
	public Subscribe(Patient patient, Pharmacy pharmacy) {
		super();
		this.patient = patient;
		this.pharmacy = pharmacy;
	}
	
	public Subscribe() {
		
	}
	
}
