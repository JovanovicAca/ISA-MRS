package com.MRSISA2021_T07.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity
public class PurchaseOrderDrug {
	
	@Id
	@SequenceGenerator(name = "myPurchaseOrderDrugSeqGen", sequenceName = "myPurchaseOrderDrugSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myPurchaseOrderDrugSeqGen")
	private long id;
	
	@Column
	private long  drugId;
	@Column 
	private String drugName;
	@Column
	private int amount;
	@ManyToOne(fetch = FetchType.EAGER)
	private PurchaseOrder purchaseOrder;
	
	public PurchaseOrderDrug() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getDrugId() {
		return drugId;
	}

	public void setDrugId(long drugId) {
		this.drugId = drugId;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public PurchaseOrder getPurchaseOrder() {
		return purchaseOrder;
	}

	public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

}
