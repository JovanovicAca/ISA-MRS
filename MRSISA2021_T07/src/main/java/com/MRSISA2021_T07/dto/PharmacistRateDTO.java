package com.MRSISA2021_T07.dto;

import java.time.LocalDate;

import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.RatingPharmacist;

public class PharmacistRateDTO {
	
	private long pharmacistID;
	private String pharmacistName;
	private String pharmacistEmail;
	private long pharmacyID;
	private String pharmacyName;
	private String pharmacyAddress;
	private float rating;
	private double myRating;
	private LocalDate ratingDate;
	private boolean selected = false;
	
	public static PharmacistRateDTO transformRate(RatingPharmacist rating)
	{
		PharmacistRateDTO dto = new PharmacistRateDTO();
		Pharmacy pharmacy = rating.getPharmacist().getEmployment().getPharmacy();
		
		dto.setPharmacyID(pharmacy.getId());
		dto.setPharmacyName(pharmacy.getName());
		dto.setPharmacyAddress(pharmacy.getAddress());
		dto.setPharmacistID(rating.getPharmacist().getId());
		dto.setPharmacistEmail(rating.getPharmacist().getEmail());
		dto.setPharmacistName(rating.getPharmacist().getName() + " " + rating.getPharmacist().getSurname());
		dto.setRating(rating.getPharmacist().getRating());
		dto.setMyRating(rating.getRating());
		dto.setRatingDate(rating.getRatingDate());
		dto.setSelected(false);
		return dto;
	}
	
	public static PharmacistRateDTO transformAppo(Appointment appointment)
	{
		PharmacistRateDTO dto = new PharmacistRateDTO();
		Pharmacy pharmacy = appointment.getPharmacy();
		
		dto.setPharmacyID(pharmacy.getId());
		dto.setPharmacyName(pharmacy.getName());
		dto.setPharmacyAddress(pharmacy.getAddress());
		dto.setPharmacistID(appointment.getDoctor().getId());
		dto.setPharmacistEmail(appointment.getDoctor().getEmail());
		dto.setPharmacistName(appointment.getDoctor().getName() + " " + appointment.getDoctor().getSurname());
		dto.setMyRating(0);
		dto.setRatingDate(null);
		dto.setSelected(false);
		return dto;
	}
	
	public PharmacistRateDTO() {
		super();
	}

	public PharmacistRateDTO(long pharmacistID, String pharmacistName, String pharmacistEmail, long pharmacyID,
			String pharmacyName, String pharmacyAddress, float rating, double myRating, LocalDate ratingDate,
			boolean selected) {
		super();
		this.pharmacistID = pharmacistID;
		this.pharmacistName = pharmacistName;
		this.pharmacistEmail = pharmacistEmail;
		this.pharmacyID = pharmacyID;
		this.pharmacyName = pharmacyName;
		this.pharmacyAddress = pharmacyAddress;
		this.rating = rating;
		this.myRating = myRating;
		this.ratingDate = ratingDate;
		this.selected = selected;
	}
	
	public long getPharmacistID() {
		return pharmacistID;
	}
	public void setPharmacistID(long pharmacistID) {
		this.pharmacistID = pharmacistID;
	}
	public String getPharmacistName() {
		return pharmacistName;
	}
	public void setPharmacistName(String pharmacistName) {
		this.pharmacistName = pharmacistName;
	}
	public String getPharmacistEmail() {
		return pharmacistEmail;
	}
	public void setPharmacistEmail(String pharmacistEmail) {
		this.pharmacistEmail = pharmacistEmail;
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
	public String getPharmacyAddress() {
		return pharmacyAddress;
	}
	public void setPharmacyAddress(String pharmacyAddress) {
		this.pharmacyAddress = pharmacyAddress;
	}
	public float getRating() {
		return rating;
	}
	public void setRating(float rating) {
		this.rating = rating;
	}
	public double getMyRating() {
		return myRating;
	}
	public void setMyRating(double myRating) {
		this.myRating = myRating;
	}
	public LocalDate getRatingDate() {
		return ratingDate;
	}
	public void setRatingDate(LocalDate ratingDate) {
		this.ratingDate = ratingDate;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
}
