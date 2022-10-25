package com.MRSISA2021_T07.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.PUser;

@Service
public interface DermatologistRepository extends JpaRepository<Dermatologist, Long>{

	@Query("SELECT a FROM Appointment a JOIN a.doctor d WHERE d.email=?1")
	public Set<Appointment> findAllByDermaEmail(String email);

	@Query("SELECT d FROM Dermatologist d WHERE d.email=?1")
	public Optional<Dermatologist> findEmail(String email);
	
	public Dermatologist findByEmail(String email);	
}
