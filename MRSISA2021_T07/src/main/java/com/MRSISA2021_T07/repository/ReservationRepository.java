package com.MRSISA2021_T07.repository;


import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	@Query("SELECT r from Reservation r where r.id = ?1")
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	//@QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value ="0")})
	public Reservation findOneById(long id);
	
	@Query("Select r from Reservation r where r.issued is TRUE AND r.pharmacy=?1")
	Set<Reservation> findAllIssued(Pharmacy p);

	@Query("Select r from Reservation r where r.issued is TRUE AND r.pharmacy=?1 AND (r.dateReserved BETWEEN ?2 AND ?3)")
	Set<Reservation> findAllIssuedBetween(Pharmacy p, LocalDateTime dateFrom, LocalDateTime dateTo);

	@Query("Select r from Reservation r join DrugReservation dr on r.id = dr.reservation.id where dr.drug=?1")
	Optional<Reservation> findByDrug(Drug d);
}
