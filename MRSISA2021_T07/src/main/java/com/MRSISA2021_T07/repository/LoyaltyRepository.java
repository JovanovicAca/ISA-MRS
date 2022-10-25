package com.MRSISA2021_T07.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Loyalty;

@Service
public interface LoyaltyRepository extends JpaRepository<Loyalty, Long> {
	
	public List<Loyalty> findAll();
	
}
