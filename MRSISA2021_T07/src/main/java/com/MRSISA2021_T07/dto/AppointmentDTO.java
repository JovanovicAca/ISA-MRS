package com.MRSISA2021_T07.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.Hibernate;

import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Pharmacy;

public class AppointmentDTO {
	private long id;
	private long pharmacyID;
	private long doctorID;
	private String pharmacyName;
	private String address;
	private String patient;
	private String mail;
	private int price;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private String doctor;
	private Boolean appeared;
	private String trajanje;
	private String datum;
	private String pocetakVremena;
	private String krajVremena;
	private boolean isSelected = false;
	
	public AppointmentDTO() {
		super();
	}
	
	public boolean isSelected() {
		return isSelected;
	}
	public void setSelected(boolean isSelected) {
		this.isSelected = isSelected;
	}



	public long getId() {
		return id;
	}
	public String getTrajanje() {
		return trajanje;
	}

	public void setTrajanje(String trajanje) {
		this.trajanje = trajanje;
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}

	public void setId(long id) {
		this.id = id;
	}
	public String getPharmacyName() {
		return pharmacyName;
	}
	public void setPharmacyName(String pharmacyName) {
		this.pharmacyName = pharmacyName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPatient() {
		return patient;
	}
	public void setPatient(String patient) {
		this.patient = patient;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
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
	public String getDoctor() {
		return doctor;
	}
	public void setDoctor(String doctor) {
		this.doctor = doctor;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
	public Boolean getAppeared() {
		return appeared;
	}

	public void setAppeared(Boolean appeared) {
		this.appeared = appeared;
	}
	public String getPocetakVremena() {
		return pocetakVremena;
	}

	public void setPocetakVremena(String pocetakVremena) {
		this.pocetakVremena = pocetakVremena;
	}

	public String getKrajVremena() {
		return krajVremena;
	}

	public void setKrajVremena(String krajVremena) {
		this.krajVremena = krajVremena;
	}

	public long getPharmacyID() {
		return pharmacyID;
	}

	public void setPharmacyID(long pharmacyID) {
		this.pharmacyID = pharmacyID;
	}

	public long getDoctorID() {
		return doctorID;
	}

	public void setDoctorID(long doctorID) {
		this.doctorID = doctorID;
	}

	public static AppointmentDTO transform(Appointment ap) {
		AppointmentDTO dto = new AppointmentDTO();
		Pharmacy ph = ap.getPharmacy();
		dto.address = ph.getAddress();
		dto.doctor = ap.getDoctor().getName()+" "+ap.getDoctor().getSurname();
		dto.endTime = ap.getEndTime();
		dto.startTime = ap.getStartTime();
		dto.price = ap.getPrice();
		dto.id = ap.getId();
		dto.appeared = ap.getAppeared();
		dto.pocetakVremena = ap.getStartTime().toString().substring(11,16);
		dto.krajVremena = ap.getEndTime().toString().substring(11,16);
		dto.setDoctorID(ap.getDoctor().getId());
		dto.setPharmacyID(ph.getId());
		
		String datum = String.valueOf(dto.getStartTime());
		dto.setDatum(datum.substring(0,10));
		dto.setTrajanje(dto.getEndTime().minusHours(dto.getStartTime().getHour()).toString().substring(11));
		
		if(ap.getPatient() == null)
		{
			dto.patient = null;
			dto.mail = null;
		}
		else
		{
			dto.patient = ap.getPatient().getName()+" "+ap.getPatient().getSurname();
			dto.mail = ap.getPatient().getEmail();
		}
			
		dto.pharmacyName = ph.getName();
		
		return dto;
	}
	public static Set<AppointmentDTO> transformCollection(Set<Appointment> apps){
		Set<AppointmentDTO> kol = new HashSet<AppointmentDTO>();
		for (Appointment ap : apps){
			//System.out.println(ap.getPatient());
			kol.add(transform(ap));
		}
		return kol;
	}
	
	@Override
	public String toString() {
		return "AppointmentDTO [id=" + id + ", pharmacyName=" + pharmacyName + ", address=" + address + ", patient="
				+ patient + ", mail=" + mail + ", price=" + price + ", startTime=" + startTime + ", endTime=" + endTime
				+ ", doctor=" + doctor + "]";
	}
	
}
