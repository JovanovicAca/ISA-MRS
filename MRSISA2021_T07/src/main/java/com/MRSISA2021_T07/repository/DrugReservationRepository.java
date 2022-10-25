package com.MRSISA2021_T07.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugReservation;
import com.MRSISA2021_T07.model.Reservation;

public interface DrugReservationRepository extends JpaRepository<Reservation, Long>{

	@Query("Select dr from DrugReservation dr join Drug d on dr.drug.id = d.id where d.id=?1")
	Optional<DrugReservation> findByDrug(long dID);

}
