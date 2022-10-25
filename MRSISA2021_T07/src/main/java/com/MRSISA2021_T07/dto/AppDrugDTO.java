package com.MRSISA2021_T07.dto;

public class AppDrugDTO implements Comparable<AppDrugDTO>{
	private String name;
	private String drugCode;
	private int quantity;
	private int takingPeriod;
	
	public AppDrugDTO() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDrugCode() {
		return drugCode;
	}
	public void setDrugCode(String drugCode) {
		this.drugCode = drugCode;
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
	public void setTakingPeriod(int takingDose) {
		this.takingPeriod = takingDose;
	}
	@Override
	public int compareTo(AppDrugDTO o) {
		
		return this.drugCode.compareTo(o.getDrugCode());
	}
	
}
