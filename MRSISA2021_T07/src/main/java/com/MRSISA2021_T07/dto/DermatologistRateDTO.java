package com.MRSISA2021_T07.dto;

import java.time.LocalDate;

import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.RatingDermatologist;
import com.MRSISA2021_T07.model.RatingPharmacist;

public class DermatologistRateDTO {

	private long pharmacistID;
	private String dermatologistName;
	private String dermatologistEmail;
	private long pharmacyID;
	private String pharmacyName;
	private String pharmacyAddress;
	private float rating;
	private double myRating;
	private LocalDate ratingDate;
	private boolean selected = false;
	
	public static DermatologistRateDTO transformRate(RatingDermatologist rating)
	{
		DermatologistRateDTO dto = new DermatologistRateDTO();
		dto.setPharmacistID(rating.getDermatologist().getId());
		dto.setDermatologistEmail(rating.getDermatologist().getEmail());
		dto.setDermatologistName(rating.getDermatologist().getName() + " " + rating.getDermatologist().getSurname());
		dto.setRating(rating.getDermatologist().getRating());
		dto.setMyRating(rating.getRating());
		dto.setRatingDate(rating.getRatingDate());
		dto.setSelected(false);
		return dto;
	}
	
	public static DermatologistRateDTO transformAppo(Appointment appointment)
	{
		DermatologistRateDTO dto = new DermatologistRateDTO();
		Pharmacy pharmacy = appointment.getPharmacy();
		
		dto.setPharmacyID(pharmacy.getId());
		dto.setPharmacyName(pharmacy.getName());
		dto.setPharmacyAddress(pharmacy.getAddress());
		dto.setPharmacistID(appointment.getDoctor().getId());
		dto.setDermatologistEmail(appointment.getDoctor().getEmail());
		dto.setDermatologistName(appointment.getDoctor().getName() + " " + appointment.getDoctor().getSurname());
		dto.setMyRating(0);
		dto.setRatingDate(null);
		dto.setSelected(false);
		return dto;
	}
	
	public DermatologistRateDTO(long pharmacistID, String dermatologistName, String dermatologistEmail, long pharmacyID,
			String pharmacyName, String pharmacyAddress, float rating, double myRating, LocalDate ratingDate,
			boolean selected) {
		super();
		this.pharmacistID = pharmacistID;
		this.dermatologistName = dermatologistName;
		this.dermatologistEmail = dermatologistEmail;
		this.pharmacyID = pharmacyID;
		this.pharmacyName = pharmacyName;
		this.pharmacyAddress = pharmacyAddress;
		this.rating = rating;
		this.myRating = myRating;
		this.ratingDate = ratingDate;
		this.selected = selected;
	}

	public DermatologistRateDTO() {
		super();
	}

	public long getPharmacistID() {
		return pharmacistID;
	}

	public void setPharmacistID(long pharmacistID) {
		this.pharmacistID = pharmacistID;
	}

	public String getDermatologistName() {
		return dermatologistName;
	}

	public void setDermatologistName(String dermatologistName) {
		this.dermatologistName = dermatologistName;
	}

	public String getDermatologistEmail() {
		return dermatologistEmail;
	}

	public void setDermatologistEmail(String dermatologistEmail) {
		this.dermatologistEmail = dermatologistEmail;
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
