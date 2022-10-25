package com.MRSISA2021_T07.model;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

@Entity
public class Reservation {
	@Id
	@SequenceGenerator(name = "myReservationSeqGen", sequenceName = "myReservationSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "myReservationSeqGen")
	private long id;
	@Column
	private LocalDateTime dateReserved;
	@Column
	private Boolean issued;
	@OneToMany(mappedBy = "reservation",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<DrugReservation> drugs;
	@ManyToOne(fetch = FetchType.EAGER)
	private Pharmacy pharmacy;
	@Column
	private double totalPrice;
	public Reservation() {
		super();
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public LocalDateTime getDateReserved() {
		return dateReserved;
	}
	public void setDateReserved(LocalDateTime dateReserved) {
		this.dateReserved = dateReserved;
	}
	public Boolean getIssued() {
		return issued;
	}
	public void setIssued(Boolean issued) {
		this.issued = issued;
	}
	public Set<DrugReservation> getDrugs() {
		return drugs;
	}
	public void setDrugs(Set<DrugReservation> drugs) {
		this.drugs = drugs;
	}
	public Pharmacy getPharmacy() {
		return pharmacy;
	}
	public void setPharmacy(Pharmacy pharmacy) {
		this.pharmacy = pharmacy;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
}
