package com.MRSISA2021_T07.dto;

import java.time.LocalDate;

import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.DrugOrderPatient;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.RatingPharmacy;

public class PharmacyRateDTO {

	private long pharmacyID;
	private String pharmacyName;
	private String pharmacyAddress;
	private float rating;
	private double myRating;
	private LocalDate ratingDate;
	private boolean selected = false;
	
	public PharmacyRateDTO(String pharmacyName, String pharmacyAddress, float rating, double myRating,
			LocalDate ratingDate, boolean selected) {
		super();
		this.pharmacyName = pharmacyName;
		this.pharmacyAddress = pharmacyAddress;
		this.rating = rating;
		this.myRating = myRating;
		this.ratingDate = ratingDate;
		this.selected = selected;
	}
	
	public PharmacyRateDTO () {};
	
	public static PharmacyRateDTO transform(Pharmacy pharmacy)
	{
		PharmacyRateDTO dto = new PharmacyRateDTO();
		
		dto.setPharmacyID(pharmacy.getId());
		dto.setPharmacyName(pharmacy.getName());
		dto.setPharmacyAddress(pharmacy.getAddress());
		dto.setRating(pharmacy.getRating());
		dto.setMyRating(0);
		dto.setRatingDate(null);
		dto.setSelected(false);
		return dto;
	}
	public static PharmacyRateDTO transform(RatingPharmacy ratingPharmacy)
	{
		PharmacyRateDTO dto = new PharmacyRateDTO();
		Pharmacy pharmacy = ratingPharmacy.getPharmacy();
		
		dto.setPharmacyID(pharmacy.getId());
		dto.setPharmacyName(pharmacy.getName());
		dto.setPharmacyAddress(pharmacy.getAddress());
		dto.setRating(pharmacy.getRating());
		dto.setMyRating(ratingPharmacy.getRating());
		dto.setRatingDate(ratingPharmacy.getRatingDate());
		dto.setSelected(false);
		return dto;
	}
	
	public static PharmacyRateDTO transformOrder(DrugOrderPatient order)
	{
		PharmacyRateDTO dto = new PharmacyRateDTO();
		Pharmacy pharmacy = order.getPharmacy();
		
		dto.setPharmacyID(pharmacy.getId());
		dto.setPharmacyName(pharmacy.getName());
		dto.setPharmacyAddress(pharmacy.getAddress());
		dto.setRating(pharmacy.getRating());
		dto.setMyRating(0);
		dto.setRatingDate(null);
		dto.setSelected(false);
		return dto;
	}
	public static PharmacyRateDTO transformAppo(Appointment appointment)
	{
		PharmacyRateDTO dto = new PharmacyRateDTO();
		Pharmacy pharmacy = appointment.getPharmacy();
		
		dto.setPharmacyID(pharmacy.getId());
		dto.setPharmacyName(pharmacy.getName());
		dto.setPharmacyAddress(pharmacy.getAddress());
		dto.setRating(pharmacy.getRating());
		dto.setMyRating(0);
		dto.setRatingDate(null);
		dto.setSelected(false);
		return dto;
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
