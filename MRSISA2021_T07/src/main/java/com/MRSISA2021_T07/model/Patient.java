package com.MRSISA2021_T07.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Patient extends PUser {
	@JsonIgnore
	@OneToMany(mappedBy = "patient", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Appointment> appointments = new HashSet<Appointment>();
	@JsonIgnore
	@OneToMany(fetch = FetchType.EAGER)
	private Set<Drug> allergies = new HashSet<Drug>();
	
	public Patient() {
		super();
	}
	public Set<Appointment> getAppointments() {
		return appointments;
	}
	public void setAppointments(Set<Appointment> appointments) {
		this.appointments = appointments;
	}
	public Set<Drug> getAllergies() {
		return allergies;
	}
	public void setAllergies(Set<Drug> allergies) {
		this.allergies = allergies;
	}
}
