package com.MRSISA2021_T07.dto;

public class ComplaintDTO {
	
	private Long id;
	private String name;
	private String surname;
	private String complaint;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
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
	public String getComplaint() {
		return complaint;
	}
	public void setComplaint(String complaint) {
		this.complaint = complaint;
	}
	
	public ComplaintDTO() {
		
	}
	
}
