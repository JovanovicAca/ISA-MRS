package com.MRSISA2021_T07.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.Subscribe;

@Service
public interface SubscribeRepository extends JpaRepository<Subscribe, Long>{
	
	public List<Subscribe> findAll();

	@Query("Select s from Subscribe s where s.pharmacy=?1")
	public Set<Subscribe> getAllSubedPharma(Pharmacy ph);

}
