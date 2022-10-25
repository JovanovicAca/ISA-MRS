package com.MRSISA2021_T07.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
import javax.persistence.SequenceGenerator;

import com.MRSISA2021_T07.dto.AppointmentDTO;

@Entity
public class Appointment {
	@Id
	@SequenceGenerator(name = "myAppointmentSeqGen", sequenceName = "myAppointmentSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myAppointmentSeqGen")
	private long id;
	@ManyToOne(fetch = FetchType.EAGER)
	private Patient patient;
	@Column
	private Boolean appeared;
	@Column
	private int price;
	@Column
	private LocalDateTime startTime;
	@Column
	private LocalDateTime endTime;
	@Column
	private String report;
	@ManyToOne(fetch = FetchType.EAGER)
	private Pharmacy pharmacy;
	@ManyToOne(fetch = FetchType.EAGER)
	private PUser doctor;
	@OneToMany(mappedBy="appointment", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<DrugAppointment> drugs;
	public Appointment() {
		super();
	}
	public Appointment(Patient p, LocalDateTime s, LocalDateTime e, Pharmacy ph, PUser d) {
		this.patient = p;
		this.startTime = s;
		this.endTime = e;
		this.pharmacy = ph;
		this.doctor = d;
	}
	

	public Appointment(Patient patient, int price, LocalDateTime startTime, LocalDateTime endTime, Pharmacy pharmacy,
			PUser doctor) {
		super();
		this.patient = patient;
		this.price = price;
		this.startTime = startTime;
		this.endTime = endTime;
		this.pharmacy = pharmacy;
		this.doctor = doctor;
	}
	public Appointment(int price, LocalDateTime s, LocalDateTime e, Pharmacy ph, PUser d) {
		this.price = price;
		this.startTime = s;
		this.endTime = e;
		this.pharmacy = ph;
		this.doctor = d;
	}
	
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
	public LocalDateTime getStartTime() {
		return startTime;
	}
	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}
	public LocalDateTime getEndTime() {
		return endTime;
	}
	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}
	public Pharmacy getPharmacy() {
		return pharmacy;
	}
	public void setPharmacy(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}
	public PUser getDoctor() {
		return doctor;
	}
	public void setDoctor(PUser doctor) {
		this.doctor = doctor;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public Boolean getAppeared() {
		return appeared;
	}
	public void setAppeared(Boolean appeared) {
		this.appeared = appeared;
	}
	public String getReport() {
		return report;
	}
	public void setReport(String report) {
		this.report = report;
	}
	public Set<DrugAppointment> getDrugs() {
		return drugs;
	}
	public void setDrugs(Set<DrugAppointment> drugs) {
		this.drugs = drugs;
	}
	
	
}
