package com.MRSISA2021_T07.dto;

public class EmploymentDTO {
	private int startH;
	private int endH;
	private long pharmaId;
	private String email;
	
	
	public EmploymentDTO() {
		
	}
	public EmploymentDTO(int startH, int endH, long pharmaId, String email) {
		super();
		this.startH = startH;
		this.endH = endH;
		this.pharmaId = pharmaId;
		this.email = email;
	}
	public int getStartH() {
		return startH;
	}
	public void setStartH(int startH) {
		this.startH = startH;
	}
	public int getEndH() {
		return endH;
	}
	public void setEndH(int endH) {
		this.endH = endH;
	}
	public long getPharmaId() {
		return pharmaId;
	}
	public void setPharmaId(long pharmaId) {
		this.pharmaId = pharmaId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
}
