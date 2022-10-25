package com.MRSISA2021_T07.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.MRSISA2021_T07.model.PurchaseOrder;

public class PurchaseOrderDTO {

	private long poID;
	private boolean approved;
	private LocalDate endTime;
	private String status;
	private long adminID;
	private long pharmaID;
	
	public PurchaseOrderDTO() {
		super();
	}

	public PurchaseOrderDTO(PurchaseOrder po) {
		poID = po.getId();
		approved = po.isApproved();
		endTime = po.getEndTime().toLocalDate();
		status = po.getStatus();
		adminID = po.getAdmin().getId(); 
		pharmaID = po.getPharma().getId();
	}


	public long getPoID() {
		return poID;
	}

	public void setPoID(long poID) {
		this.poID = poID;
	}

	public LocalDate getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDate endTime) {
		this.endTime = endTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public long getAdminID() {
		return adminID;
	}

	public void setAdminID(long adminID) {
		this.adminID = adminID;
	}


	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public long getPharmaID() {
		return pharmaID;
	}

	public void setPharmaID(long pharmaID) {
		this.pharmaID = pharmaID;
	}
	

	
}
