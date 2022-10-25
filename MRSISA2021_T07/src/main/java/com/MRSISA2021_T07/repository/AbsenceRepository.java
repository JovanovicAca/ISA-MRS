package com.MRSISA2021_T07.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.MRSISA2021_T07.model.Absence;
import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.PUser;

public interface AbsenceRepository extends JpaRepository<Absence, Long> {
	
	@Query("SELECT a FROM Absence a JOIN a.doctor d WHERE a.doctor = d.id AND d.id=?1")
	public Set<Absence> findAllByDoctorId(long id);
	
	@Query("SELECT a FROM Absence a JOIN a.doctor d WHERE (a.doctor = d.id) AND (d.id=?1) AND (a.endDate<?2) AND (a.approved IS TRUE OR a.approved IS NULL)")
	public Set<Absence> findAllByDoctorIdBefore(long id, LocalDateTime now);

	@Query("Select a from Absence a where a.approved IS TRUE")
	public Set<Absence> findAllApproved();
	
	@Query("Select a from Absence a where a.approved IS FALSE")
	public Set<Absence> findAllNotApproved();

	@Query("Select a from Absence a where a.doctor=?1 and a.approved is true and (?2 between a.startDate and a.endDate)")
	public Optional<Absence> findAbsence(Dermatologist dermatologist, LocalDate localDate);
	
	@Query("Select a from Absence a where (a.approved=true) AND (a.doctor=?1) AND ((?2 BETWEEN a.startDate AND a.endDate) OR (?3 BETWEEN a.startDate AND a.endDate) OR ((?2<a.startDate) AND (?3>a.endDate)))")
	public Set<Absence> findAllAbsencedInInterval(PUser doc, LocalDate str, LocalDate end);
}
