package com.MRSISA2021_T07.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Supplier;

@Service
public interface SupplierRepository extends JpaRepository<Supplier, Long>{
	
	@Query("SELECT s FROM Dermatologist s WHERE s.email=?1")
	public Optional<Supplier> findEmail(String email);
	
	public Supplier findByEmail(String email);	
	
}
