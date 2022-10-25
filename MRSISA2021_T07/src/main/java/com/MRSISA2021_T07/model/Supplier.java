package com.MRSISA2021_T07.model;

import javax.persistence.Entity;

@Entity
public class Supplier extends PUser{

	public Supplier(long id, String name, String surname, String email, String password, String address, String city,
			String country, int number, String role, String worksID, String authenticated, String verificationCode) {
		super(id, name, surname, email, password, address, city, country, number, role, worksID,authenticated, verificationCode);
	}
	
	public Supplier() {
		super();
	}
	
}
