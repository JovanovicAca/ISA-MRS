package com.MRSISA2021_T07.dto;

import java.time.LocalDateTime;

public class DisplayOffersDTO {

	private long id;

	private String drugs;

	private LocalDateTime endTime;
	
	private String pharmacy;

	public DisplayOffersDTO() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public String getDrugs() {
		return drugs;
	}

	public void setDrugs(String drugs) {
		this.drugs = drugs;
	}

	public String getPharmacy() {
		return pharmacy;
	}

	public void setPharmacy(String pharmacy) {
		this.pharmacy = pharmacy;
	}
	
	
	
}
