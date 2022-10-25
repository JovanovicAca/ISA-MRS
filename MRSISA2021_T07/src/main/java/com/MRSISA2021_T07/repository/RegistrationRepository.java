package com.MRSISA2021_T07.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.PUser;

@Service
public interface RegistrationRepository extends JpaRepository<PUser, Long>{
	
	public PUser findByEmail(String email);
	
}
