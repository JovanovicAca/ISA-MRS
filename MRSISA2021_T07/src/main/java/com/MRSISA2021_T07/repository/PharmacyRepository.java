package com.MRSISA2021_T07.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;

@Service
public interface PharmacyRepository extends JpaRepository<Pharmacy, Long>{

	Pharmacy findByName(String name);
	
	public List<Pharmacy> findAll();

	

	
}
