package com.MRSISA2021_T07.dto;

import java.text.DecimalFormat;

import com.MRSISA2021_T07.model.PUser;

public class DoctorRatingDTO {
	private float rate;
	private PUser doctor;
	
	
	public DoctorRatingDTO() {
		super();
	}
	
	public DoctorRatingDTO(float rating, PUser user)
	{
		rate = Float.parseFloat(makeDecimal(rating));
		doctor = user;
	}
	


	private String makeDecimal(float rating) {
		DecimalFormat df = new DecimalFormat("0.00");
		return df.format(rating);
	}

	public float getRate() {
		return rate;
	}

	public void setRate(float rate) {
		this.rate = rate;
	}

	public PUser getDoctor() {
		return doctor;
	}


	public void setDoctor(PUser doctor) {
		this.doctor = doctor;
	}
	
	
}
