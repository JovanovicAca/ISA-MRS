package com.MRSISA2021_T07.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Pharmacist extends PUser {
	@Column
	private float rating;
	@JsonIgnore
	@OneToOne(mappedBy = "employee", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Employment employment;
	@JsonIgnore
	@OneToMany(mappedBy = "doctor", fetch = FetchType.EAGER, cascade= CascadeType.ALL)
	private Set<Appointment> appointments = new HashSet<Appointment>();
	@JsonIgnore
	@OneToMany(mappedBy = "doctor", fetch = FetchType.EAGER, cascade= CascadeType.ALL)
	private Set<Absence> absences = new HashSet<Absence>();
	
	
	public Pharmacist() {
		super();
	}

	public Pharmacist(long id, String name, String surname, String email, String password, String address, String city,
			String country, int number, String role, String pharmacy, String worksID, String authenticated, String verificationCode) {
		super(id, name, surname, email, password, address, city, country, number, role, worksID,authenticated, verificationCode);
	}
	
	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public Employment getEmployment() {
		return employment;
	}

	public void setEmployment(Employment employment) {
		this.employment = employment;
	}

	public Set<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(Set<Appointment> appointments) {
		this.appointments = appointments;
	}

	
	
}
