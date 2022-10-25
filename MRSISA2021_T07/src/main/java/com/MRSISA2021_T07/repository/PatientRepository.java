package com.MRSISA2021_T07.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

	//@Query(value = "SELECT p from Patient p JOIN Appointment a join fetch a.doctor d where d.id = ?1")
	//public Patient findCurrentPatient(long id);
	@Query("select p from Patient p where p.email =?1")
	public Patient findByEmail(String email);
	
	@Query("select p from Patient p join fetch p.allergies where p.email =?1")
	public Patient findByEmailWithAllergies(String email);

}
