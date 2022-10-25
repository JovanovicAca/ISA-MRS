package com.MRSISA2021_T07.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;

import com.MRSISA2021_T07.model.PurchaseOrderDrug;

public class PurchaseOrderDrugDTO {

	private long id;
	private String drugName;
	private String drugCode;
	private long drugId;
	private int amount;
	private LocalDateTime endTime;
	
	public PurchaseOrderDrugDTO() {
		
	}

	public PurchaseOrderDrugDTO(PurchaseOrderDrug pod) {
		drugName = pod.getDrugName();
		amount = pod.getAmount();
		drugId = pod.getDrugId();
	}
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDrugCode() {
		return drugCode;
	}

	public void setDrugCode(String drugCode) {
		this.drugCode = drugCode;
	}

	public long getDrugId() {
		return drugId;
	}

	public void setDrugId(long drugId) {
		this.drugId = drugId;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	@Override
	public String toString() {
		return "PurchaseOrderDrugDTO [id=" + id + ", drugCode=" + drugCode + ", amount=" + amount + ", endTime="
				+ endTime + "]";
	}
	
	
}
