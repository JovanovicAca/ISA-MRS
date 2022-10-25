package com.MRSISA2021_T07.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.Pharmacy;

@Service
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	
	@Query("SELECT a FROM Appointment a JOIN a.doctor d WHERE a.doctor = d.id AND d.id=?1")
	public Set<Appointment> findAllByDoctorId(long id);
	
	@Query("SELECT a FROM Appointment a JOIN a.doctor d WHERE (a.doctor = d.id) AND (d.id=?1) AND (a.endTime<?2)")
	public Set<Appointment> findAllByDoctorIdBefore(long id, LocalDateTime now);
	
	@Query(value = "select * from appointment a where a.doctor_id = ?1", nativeQuery = true)
	public Set<Appointment> findAllByDoctorIdNative(long doctor_id);
	
	@Query("SELECT a FROM Appointment a join fetch a.doctor d where d.id=?1 and a.startTime <?2 and ?2<a.endTime")
	public Appointment findCurrentAppointment(long doctor_id, LocalDateTime now);
	
	@Query("SELECT a from Appointment a where ((?1 BETWEEN a.startTime AND a.endTime) OR (?2 BETWEEN a.startTime AND a.endTime) OR ((?1<=a.startTime) AND (?2>=a.endTime))) AND a.patient=?3")
	public Set<Appointment> findAllOverlapingIntervalPatient(LocalDateTime str, LocalDateTime ed, Patient p);
	
	@Query("SELECT a from Appointment a where ((?1 BETWEEN a.startTime AND a.endTime) OR (?2 BETWEEN a.startTime AND a.endTime) OR ((?1<=a.startTime) AND (?2>=a.endTime))) AND a.doctor=?3")
	public Set<Appointment> findAllOverlapingIntervalDoctor(LocalDateTime str, LocalDateTime ed, PUser doc);

	@Query("Select a from Appointment a where a.appeared is TRUE AND a.pharmacy=?1")
	public Set<Appointment> findAllThatCame(Pharmacy p);

	@Query("Select a from Appointment a where a.appeared is TRUE AND a.pharmacy=?1 AND (a.startTime BETWEEN ?2 AND ?3) AND (a.endTime BETWEEN ?2 AND ?3)")
	public Set<Appointment> findAllBetween(Pharmacy p, LocalDateTime dateFrom, LocalDateTime dateTo);


}
