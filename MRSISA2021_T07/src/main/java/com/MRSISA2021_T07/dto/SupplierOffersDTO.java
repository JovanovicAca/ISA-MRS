package com.MRSISA2021_T07.dto;

public class SupplierOffersDTO {

	public long id;
	public long price;
	public String drugs;
	public String approved;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public String getDrugs() {
		return drugs;
	}

	public void setDrugs(String drugs) {
		this.drugs = drugs;
	}

	public SupplierOffersDTO(long id, long price, String drugs) {
		super();
		this.id = id;
		this.price = price;
		this.drugs = drugs;
	}

	public String isApproved() {
		return approved;
	}

	public void setApproved(String approved) {
		this.approved = approved;
	}

	public SupplierOffersDTO() {

	}

}
