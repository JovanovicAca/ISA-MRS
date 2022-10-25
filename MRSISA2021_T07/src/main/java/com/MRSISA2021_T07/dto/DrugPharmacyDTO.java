package com.MRSISA2021_T07.dto;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugPharmacy;
import com.MRSISA2021_T07.model.Pharmacy;

public class DrugPharmacyDTO {

	private long pharmacyID;
	private long drugID;
	private String drugCode;
	private String pharmacyName;
	private String address;
	private double amount;
	private double price;
	private LocalDate startPrice;
	private LocalDate endPrice;
	private String drugName;
	private boolean selected;
	private double actionPrice;
	private LocalDate actionStartPrice;
	private LocalDate actionEndPrice;
	
	public DrugPharmacyDTO() {
		super();
	}
	public DrugPharmacyDTO(DrugPharmacy dp) {
		pharmacyID = dp.getPharma().getId();
		drugID = dp.getDrug().getId();
		drugCode = dp.getDrug().getDrugCode();
		pharmacyName = dp.getPharmacy().getName();
		address = dp.getPharmacy().getAddress();
		amount = dp.getAmount();
		price = dp.getPrice();
		startPrice = dp.getStartPrice();
		endPrice = dp.getEndPrice();
		selected = false;
		drugName = dp.getDrug().getName();
		actionPrice = dp.getActionPrice();
		actionStartPrice = dp.getStartActionPrice();
		actionEndPrice = dp.getEndActionPrice();
	}
	
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	public long getPharmacyID() {
		return pharmacyID;
	}
	public void setPharmacyID(long pharmacyID) {
		this.pharmacyID = pharmacyID;
	}
	public long getDrugID() {
		return drugID;
	}
	public void setDrugID(long drugID) {
		this.drugID = drugID;
	}
	public String getDrugCode() {
		return drugCode;
	}
	public void setDrugCode(String drugCode) {
		this.drugCode = drugCode;
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
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public LocalDate getStartPrice() {
		return startPrice;
	}

	public void setStartPrice(LocalDate startPrice) {
		this.startPrice = startPrice;
	}

	public LocalDate getEndPrice() {
		return endPrice;
	}

	public void setEndPrice(LocalDate endPrice) {
		this.endPrice = endPrice;
	}

	public double getActionPrice() {
		return actionPrice;
	}
	public void setActionPrice(double actionPrice) {
		this.actionPrice = actionPrice;
	}
	public LocalDate getActionStartPrice() {
		return actionStartPrice;
	}
	public void setActionStartPrice(LocalDate actionStartPrice) {
		this.actionStartPrice = actionStartPrice;
	}
	public LocalDate getActionEndPrice() {
		return actionEndPrice;
	}
	public void setActionEndPrice(LocalDate actionEndPrice) {
		this.actionEndPrice = actionEndPrice;
	}
	public static DrugPharmacyDTO transform(DrugPharmacy dp)
	{
		DrugPharmacyDTO dpo = new DrugPharmacyDTO();
		Pharmacy pharma = dp.getPharma();
		Drug drug = dp.getDrug();
		dpo.pharmacyID = pharma.getId();
		dpo.drugID = drug.getId();
		dpo.pharmacyName = pharma.getName();
		dpo.address = pharma.getAddress();
		dpo.amount = dp.getAmount();
		dpo.price = dp.getPrice();
		dpo.startPrice = dp.getStartPrice();
		dpo.endPrice = dp.getEndPrice();
		dpo.drugName = drug.getName();
		return dpo;
	}
	
	public static Set<DrugPharmacyDTO> transformCollection(Set<DrugPharmacy> dps)
	{
		Set<DrugPharmacyDTO> dtos = new HashSet<DrugPharmacyDTO>();
		for (DrugPharmacy dp : dps) {
			dtos.add(transform(dp));
		}
		return dtos;
	}
}
