package com.MRSISA2021_T07.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Pharmacy {
	@Id
	@SequenceGenerator(name = "myPharmacySeqGen", sequenceName = "myPharmacySeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myPharmacySeqGen")
	private long id;
	@Column
	private String name;
	@Column
	private String address;
	@Column
	private float rating;
	@JsonIgnore
	@OneToMany
	(mappedBy = "pharmacy", fetch = FetchType.EAGER, cascade= CascadeType.ALL)
	private Set<Employment> employments = new HashSet<Employment>();
	@JsonIgnore
	@OneToMany
	(mappedBy = "pharmacy", fetch = FetchType.EAGER, cascade= CascadeType.ALL)
	private Set<Appointment> appointments = new HashSet<Appointment>();
	@Column
	private String description;
	
	public Pharmacy() {
		super();
	}
	
	
	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}
	
	public float getRating() {
		return rating;
	}


	public void setRating(float rating) {
		this.rating = rating;
	}


	public Set<Employment> getEmployments() {
		return employments;
	}


	public void setEmployments(Set<Employment> employments) {
		this.employments = employments;
	}


	public Set<Appointment> getAppointments() {
		return appointments;
	}


	public void setAppointments(Set<Appointment> appointments) {
		this.appointments = appointments;
	}


	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	@Override
	public String toString() {
		return "["+id+"]"+" "+name+" , "+address;
	}
}
