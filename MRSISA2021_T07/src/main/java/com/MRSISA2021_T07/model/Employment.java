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
public class Employment {
	@Id
	@SequenceGenerator(name = "myEmploymentSeqGen", sequenceName = "myEmploymentSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myEmploymentSeqGen")
	private Long id;
	@Column
	private int startHours;
	@Column
	private int endHours;
	@ManyToOne(fetch = FetchType.EAGER)
	private PUser employee;
	@ManyToOne(fetch = FetchType.EAGER)
	private Pharmacy pharmacy;
	public Employment() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public PUser getEmployee() {
		return employee;
	}
	public void setEmployee(PUser employee) {
		this.employee = employee;
	}
	public int getStartHours() {
		return startHours;
	}
	public void setStartHours(int startHours) {
		this.startHours = startHours;
	}
	public int getEndHours() {
		return endHours;
	}
	public void setEndHours(int endHours) {
		this.endHours = endHours;
	}
	public Pharmacy getPharmacy() {
		return pharmacy;
	}
	public void setPharmacy(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}
	
}
