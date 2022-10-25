package com.MRSISA2021_T07.dto;

import java.util.Set;

import javax.persistence.Column;

import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Pharmacy;

public class DermatologistDTO {

	private long id;
	private String name;
	private String surname;
	private String email;
	private String pharmacyName;
	private String pharmacyAddress;
	
	public DermatologistDTO() {};
	
	public DermatologistDTO(long id, String name, String surname, String email, String pharmacyName,
			String pharmacyAddress) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.pharmacyName = pharmacyName;
		this.pharmacyAddress = pharmacyAddress;
	}
	
	public static DermatologistDTO transform(Dermatologist d)
	{
		DermatologistDTO dFront = new DermatologistDTO();
		dFront.setName(d.getName());
		dFront.setSurname(d.getSurname());
		dFront.setEmail(d.getEmail());
		Set<Employment> employments = d.getEmployments();
		for (Employment employment : employments) {
			dFront.setPharmacyName(employment.getPharmacy().getName());
			dFront.setPharmacyAddress(employment.getPharmacy().getAddress());
		}
		return dFront;
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
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPharmacyName() {
		return pharmacyName;
	}
	public void setPharmacyName(String pharmacyName) {
		this.pharmacyName = pharmacyName;
	}
	public String getPharmacyAddress() {
		return pharmacyAddress;
	}
	public void setPharmacyAddress(String pharmacyAddress) {
		this.pharmacyAddress = pharmacyAddress;
	}
}
