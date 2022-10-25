package com.MRSISA2021_T07.dto;

import com.MRSISA2021_T07.model.DrugAppointment;

public class DrugAppointmentDTO {

	private String patientEmail;
	private int quantity;
	private int takingPeriod;
	private long appointmentID;
	private String drugName;

	public DrugAppointmentDTO() {}

	public DrugAppointmentDTO(int quantity, int takingPeriod, long appointmentID, String drugName) {
		super();
		this.quantity = quantity;
		this.takingPeriod = takingPeriod;
		this.appointmentID = appointmentID;
		this.drugName = drugName;
	}
	
	public static DrugAppointmentDTO transform(DrugAppointment drugAppo)
	{
		DrugAppointmentDTO dto = new DrugAppointmentDTO();
		dto.setPatientEmail(drugAppo.getAppointment().getPatient().getEmail());
		dto.setAppointmentID(drugAppo.getAppointment().getId());
		dto.setDrugName(drugAppo.getDrug().getName());
		dto.setQuantity(drugAppo.getQuantity());
		dto.setTakingPeriod(drugAppo.getTakingPeriod());		
		return dto;
	}

	
	
	public String getPatientEmail() {
		return patientEmail;
	}

	public void setPatientEmail(String patientEmail) {
		this.patientEmail = patientEmail;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getTakingPeriod() {
		return takingPeriod;
	}

	public void setTakingPeriod(int takingPeriod) {
		this.takingPeriod = takingPeriod;
	}

	public long getAppointmentID() {
		return appointmentID;
	}

	public void setAppointmentID(long appointmentID) {
		this.appointmentID = appointmentID;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}
}
