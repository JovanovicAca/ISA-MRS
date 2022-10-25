package com.MRSISA2021_T07.dto;
 
import javax.persistence.Column;
 
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Pharmacy;
 
public class AdminDTO {
 
	protected long id;
	protected String name;
	protected String surname;
	protected String email;
	protected String password;
	protected String address;
	protected String city;
	protected String country;
	protected int number;
	protected String role;
	private String adminType;
	private Long pharmacy_id;
 
	public AdminDTO()
	{
 
	}
 
	public AdminDTO(Admin a)
	{
		this.name = a.getName();
		this.surname = a.getSurname();
		this.email = a.getEmail();
		this.password = a.getPassword();
		this.address = a.getAddress();
		this.city = a.getCity();
		this.country = a.getCountry();
		this.number = a.getNumber();
		this.role = "Admin";
		this.adminType = a.getAdminType();
		this.pharmacy_id = a.getWorks();
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getAdminType() {
		return adminType;
	}
	public void setAdminType(String adminType) {
		this.adminType = adminType;
	}
	public Long getPharmacy_id() {
		return pharmacy_id;
	}
	public void setPharmacy_id(Long pharmacy_id) {
		this.pharmacy_id = pharmacy_id;
	}
}