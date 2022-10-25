package com.MRSISA2021_T07.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class SupplierPurchaseOrder {
	// supplier bid a order

	@Id
	@SequenceGenerator(name = "mySupplierPurchaseOrderSeqGen", sequenceName = "mySupplierPurchaseOrderSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "mySupplierPurchaseOrderSeqGen")
	private long id;

	@Column
	private long orderId;
	@Column
	private long price;
	@Column
	private String email; // Supplier mail
	@Column
	private LocalDateTime deliveryTime;
	@Column
	private boolean approved;

	public SupplierPurchaseOrder() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDateTime getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(LocalDateTime deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}
	

}
