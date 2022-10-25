package com.MRSISA2021_T07.dto;

import java.time.LocalDateTime;

import com.MRSISA2021_T07.model.Appointment;

public class ConsultationDTO {

	private long consultationID;
	private String doctor;
	private String pharmacyName;
	private String pharmacyAddress;
	private String date;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private boolean selected = false;
	public long getConsultationID() {
		return consultationID;
	}
	public void setConsultationID(long consultationID) {
		this.consultationID = consultationID;
	}
	public String getDoctor() {
		return doctor;
	}
	public void setDoctor(String doctor) {
		this.doctor = doctor;
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
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public LocalDateTime getStartTime() {
		return startTime;
	}
	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}
	public LocalDateTime getEndTime() {
		return endTime;
	}
	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	
	public ConsultationDTO(long consultationID, String doctor, String pharmacyName, String pharmacyAddress, String date,
			LocalDateTime startTime, LocalDateTime endTime, boolean selected) {
		super();
		this.consultationID = consultationID;
		this.doctor = doctor;
		this.pharmacyName = pharmacyName;
		this.pharmacyAddress = pharmacyAddress;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		this.selected = selected;
	}
	
	public ConsultationDTO() {}
	
	public static ConsultationDTO transform(Appointment a)
	{
		ConsultationDTO dto = new ConsultationDTO();
		dto.setDoctor(a.getDoctor().getName() + " " + a.getDoctor().getSurname());
		dto.setPharmacyName(a.getPharmacy().getName());
		dto.setPharmacyAddress(a.getPharmacy().getAddress());
		String datum = String.valueOf(a.getStartTime());
		dto.setDate(datum.substring(0,10));
		dto.setStartTime(a.getStartTime());
		dto.setEndTime(a.getEndTime());
		dto.setConsultationID(a.getId());
		return dto;
	}
}
