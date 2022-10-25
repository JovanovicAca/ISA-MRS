package com.MRSISA2021_T07.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

@Entity
public class PurchaseOrder {
	//how purchase order looks in first place when admin wants it
	@Id
	@SequenceGenerator(name = "myPurchaseOrderSeqGen", sequenceName = "myPurchaseOrderSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myPurchaseOrderSeqGen")
	private long id;
	@OneToMany(mappedBy = "purchaseOrder", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<PurchaseOrderDrug> drugs;
	
	private ArrayList<PurchaseOrderDrug> drugsP;
	
	@Column
	private LocalDateTime endTime;
	@Column
	private boolean approved;
	@Column
	private String status; // "Open" ili "Closed", da li je uzet ili nije
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Admin admin;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Pharmacy pharma;
	
	public PurchaseOrder() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Set<PurchaseOrderDrug> getDrugs() {
		return drugs;
	}

	public void setDrugs(Set<PurchaseOrderDrug> drugs) {
		this.drugs = drugs;
	}
	////////////
	public ArrayList<PurchaseOrderDrug> getDrugsP() {
		return drugsP;
	}

	public void setDrugsP(ArrayList<PurchaseOrderDrug> drugsP) {
		this.drugsP = drugsP;
	}
	////////
	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
	
	public Pharmacy getPharma() {
		return pharma;
	}

	public void setPharma(Pharmacy pharma) {
		this.pharma = pharma;
	}

	public void initList() {
		this.drugsP = new ArrayList<PurchaseOrderDrug>();
	}
	
}
