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
public class Absence {
	@Id
	@SequenceGenerator(name = "myAbsenceSeqGen", sequenceName = "myAbsenceSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myAbsenceSeqGen")
	private long id;
	@ManyToOne(fetch = FetchType.EAGER)
	private PUser doctor;
	@Column(nullable = true)
	private Boolean approved;
	@Column
	private String description;
	@Column
	private LocalDate startDate;
	@Column
	private LocalDate endDate;
	
	
	public Absence() {
		super();
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Boolean isApproved() {
		return approved;
	}

	public void setApproved(Boolean approved) {
		this.approved = approved;
	}

	public PUser getDoctor() {
		return doctor;
	}
	public void setDoctor(PUser doctor) {
		this.doctor = doctor;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	
}
