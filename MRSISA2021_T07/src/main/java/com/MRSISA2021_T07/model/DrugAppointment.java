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
public class DrugAppointment {
	@Id
	@SequenceGenerator(name = "myDrugAppointmentSeqGen", sequenceName = "myDrugAppointmentSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myDrugAppointmentSeqGen")
	private long id;
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Appointment appointment;
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Drug drug;
	@Column
	private int quantity;
	@Column
	private int takingPeriod;
	public DrugAppointment() {
		super();
	}
	
	public DrugAppointment(Appointment appointment, Drug drug, int quantity, int takingPeriod) {
		super();
		this.appointment = appointment;
		this.drug = drug;
		this.quantity = quantity;
		this.takingPeriod = takingPeriod;
	}

	public Appointment getAppointment() {
		return appointment;
	}
	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}
	public Drug getDrug() {
		return drug;
	}
	public void setDrug(Drug drug) {
		this.drug = drug;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getTakingPeriod() {
		return takingPeriod;
	}
	public void setTakingPeriod(int takingPeriod) {
		this.takingPeriod = takingPeriod;
	}
	
}
