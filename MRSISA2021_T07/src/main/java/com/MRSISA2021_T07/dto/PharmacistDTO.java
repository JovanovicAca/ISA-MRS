package com.MRSISA2021_T07.dto;

import java.awt.desktop.AppForegroundEvent;
import java.util.Set;

import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.Pharmacist;

public class PharmacistDTO {

	private long id;
	private String name;
	private String surname;
	private String email;
	private String pharmacyName;
	private String pharmacyAddress;
	private float rating;
	private boolean selected = false;
	
	public PharmacistDTO() {};
	
	public PharmacistDTO(long id, String name, String surname, String email, String pharmacyName,
			String pharmacyAddress) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.pharmacyName = pharmacyName;
		this.pharmacyAddress = pharmacyAddress;
	}
	
	public static PharmacistDTO transform(Pharmacist d)
	{
		PharmacistDTO pFront = new PharmacistDTO();
		pFront.setName(d.getName());
		pFront.setSurname(d.getSurname());
		pFront.setEmail(d.getEmail());
		pFront.setId(d.getId());
		pFront.setPharmacyName(d.getEmployment().getPharmacy().getName());
		pFront.setPharmacyAddress(d.getEmployment().getPharmacy().getAddress());
		pFront.setSelected(false);
		pFront.setRating(d.getRating());
		return pFront;
	}
	
	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
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
