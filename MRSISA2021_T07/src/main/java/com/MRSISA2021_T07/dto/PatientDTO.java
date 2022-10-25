package com.MRSISA2021_T07.dto;

import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugPharmacy;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Pharmacy;

public class PatientDTO {

	private String name;
	private String surname;
	private String email;
	private String password;
	private String role;
	private long works = 0;
	
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public long getWorks() {
		return works;
	}
	public void setWorks(long works) {
		this.works = works;
	}
	public static PatientDTO transform(PUser p)
	{
		PatientDTO pFront = new PatientDTO();
		pFront.setName(p.getName());
		pFront.setSurname(p.getSurname());
		pFront.setEmail(p.getEmail());
		pFront.setPassword(p.getPassword());
		pFront.setRole(p.getRole());
		return pFront;
	}
	public static PatientDTO transformAdmin(PUser p, long works) {
		PatientDTO pFront = new PatientDTO();
		pFront.setName(p.getName());
		pFront.setSurname(p.getSurname());
		pFront.setEmail(p.getEmail());
		pFront.setPassword(p.getPassword());
		pFront.setRole(p.getRole());
		pFront.setWorks(works);
		return pFront;
	}
	
}
