package com.MRSISA2021_T07.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.DrugOrderPatient;

@Service
public interface DrugOrderPatientRepository extends JpaRepository<DrugOrderPatient, Long>{

}
