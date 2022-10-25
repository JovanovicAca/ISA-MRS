package com.MRSISA2021_T07.dto;
 
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
 
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
 
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.Pharmacy;
import com.fasterxml.jackson.annotation.JsonIgnore;
 
public class PharmacyDTO {
 
	private long id;
	private String name;
	private String address;
	private ArrayList<Integer> ratings;
	private double rating;
	private boolean selected = false;
	
	public static PharmacyDTO transform(Pharmacy p)
	{
		PharmacyDTO dto = new PharmacyDTO();
		dto.setName(p.getName());
		dto.setAddress(p.getAddress());
		dto.setId(p.getId());
		dto.setRating(p.getRating());
		dto.setSelected(false);
		return dto;
	}
 
	public PharmacyDTO()
	{
 
	}
 
	public PharmacyDTO(Pharmacy p)
	{
		this.id = p.getId();
		this.name = p.getName();
		this.address = p.getAddress();
	}
 
	public long getId() {
		return id;
	}
 
	public void setId(long id) {
		this.id = id;
	}
 
	public String getName() {
		return name;
	}
	
 
	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	public void setName(String name) {
		this.name = name;
	}
 
	public String getAddress() {
		return address;
	}
 
	public void setAddress(String address) {
		this.address = address;
	}
 
	public ArrayList<Integer> getRatings() {
		return ratings;
	}
 
	public void setRatings(ArrayList<Integer> ratings) {
		this.ratings = ratings;
	}
 
	public double getRating() {
		return rating;
	}
 
	public void setRating(double rating) {
		this.rating = rating;
	}
}