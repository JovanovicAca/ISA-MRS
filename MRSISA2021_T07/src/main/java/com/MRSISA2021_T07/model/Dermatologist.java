package com.MRSISA2021_T07.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Dermatologist extends PUser{
	@Column
	private float rating;
	@JsonIgnore
	@OneToMany(mappedBy = "employee", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Employment>employments =  new HashSet<Employment>();
	@JsonIgnore
	@OneToMany(mappedBy = "doctor", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Appointment> appointments = new HashSet<Appointment>();
	@JsonIgnore
	@OneToMany(mappedBy = "doctor", fetch = FetchType.EAGER, cascade= CascadeType.ALL)
	private Set<Absence> absences = new HashSet<Absence>();
	
	public Dermatologist(long id, String name, String surname, String email, String password, String address, String city,
			String country, int number, String role, String worksID, String authenticated, String verificationCode) {
		super(id, name, surname, email, password, address, city, country, number, role, worksID, authenticated, verificationCode);
	}
	public Dermatologist() {
		super();
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
	
}
