package com.MRSISA2021_T07.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Pharmacist;

@Service
public interface PharmacistRepository extends JpaRepository<Pharmacist, Long> {

	public Pharmacist findByEmail(String email);
	
}
