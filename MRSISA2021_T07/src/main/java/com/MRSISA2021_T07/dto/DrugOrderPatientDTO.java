package com.MRSISA2021_T07.dto;

import java.time.LocalDateTime;

import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugOrderPatient;
import com.MRSISA2021_T07.model.Pharmacy;

public class DrugOrderPatientDTO {

	private long orderID;
	private double price;
	private int quantity;
	private String recivingDate;
	private String startDate;
	private String datum;
	private long drugID;
	private String drugName;
	private String drugShape;
	private String drugType;
	private long pharmacyID;
	private String pharmacyName;
	private String patientEmail;
	private boolean selected = false;
	private boolean recived = false;
	private boolean canceled = false;
	
	public static DrugOrderPatientDTO transform(DrugOrderPatient order) 
	{
		DrugOrderPatientDTO dto = new DrugOrderPatientDTO();
		Pharmacy pharmacy = order.getPharmacy();
		Drug drug = order.getDrug();
		
		String datum = String.valueOf(order.getStartDate());
		dto.setSelected(false);
		dto.setPatientEmail(order.getPatient().getEmail());
		dto.setDatum(datum.substring(0,10));
		dto.setCanceled(order.isCanceled());
		dto.setRecived(order.isRecived());
		dto.setOrderID(order.getId());
		dto.setPrice(order.getPrice());
		dto.setQuantity(order.getQuantity());
		dto.setRecivingDate(order.getRecivingDate().toString());
		dto.setStartDate(order.getStartDate().toString());
		dto.setDrugID(drug.getId());
		dto.setDrugName(drug.getName());
		dto.setDrugShape(drug.getShape());
		dto.setDrugType(drug.getTypes());
		dto.setPharmacyID(pharmacy.getId());
		dto.setPharmacyName(pharmacy.getName());
		
		return dto;
	}
	
	public DrugOrderPatientDTO() {}
	
	public DrugOrderPatientDTO(long orderID, double price, int quantity, String recivingDate, String startDate,
			String datum, long drugID, String drugName, String drugShape, String drugType, long pharmacyID,
			String pharmacyName, String patientEmail, boolean recived) {
		super();
		this.orderID = orderID;
		this.price = price;
		this.quantity = quantity;
		this.recivingDate = recivingDate;
		this.startDate = startDate;
		this.datum = datum;
		this.drugID = drugID;
		this.drugName = drugName;
		this.drugShape = drugShape;
		this.drugType = drugType;
		this.pharmacyID = pharmacyID;
		this.pharmacyName = pharmacyName;
		this.patientEmail = patientEmail;
		this.recived = recived;
	}
	
	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	public boolean isCanceled() {
		return canceled;
	}

	public void setCanceled(boolean canceled) {
		this.canceled = canceled;
	}

	public String getRecivingDate() {
		return recivingDate;
	}

	public void setRecivingDate(String recivingDate) {
		this.recivingDate = recivingDate;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getPatientEmail() {
		return patientEmail;
	}

	public void setPatientEmail(String patientEmail) {
		this.patientEmail = patientEmail;
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}

	public boolean isRecived() {
		return recived;
	}

	public void setRecived(boolean recived) {
		this.recived = recived;
	}

	public long getOrderID() {
		return orderID;
	}
	public void setOrderID(long orderID) {
		this.orderID = orderID;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public long getDrugID() {
		return drugID;
	}
	public void setDrugID(long drugID) {
		this.drugID = drugID;
	}
	public String getDrugName() {
		return drugName;
	}
	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}
	public String getDrugShape() {
		return drugShape;
	}
	public void setDrugShape(String drugShape) {
		this.drugShape = drugShape;
	}
	public String getDrugType() {
		return drugType;
	}
	public void setDrugType(String drugType) {
		this.drugType = drugType;
	}
	public long getPharmacyID() {
		return pharmacyID;
	}
	public void setPharmacyID(long pharmacyID) {
		this.pharmacyID = pharmacyID;
	}
	public String getPharmacyName() {
		return pharmacyName;
	}
	public void setPharmacyName(String pharmacyName) {
		this.pharmacyName = pharmacyName;
	}
}
