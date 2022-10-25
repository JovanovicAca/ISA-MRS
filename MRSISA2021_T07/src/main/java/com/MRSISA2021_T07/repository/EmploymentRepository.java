package com.MRSISA2021_T07.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Pharmacy;

@Service
public interface EmploymentRepository extends JpaRepository<Employment, Long> {
	
	@Query("select e from Employment e join fetch e.employee d where d.id=?1 and (e.startHours <= ?2) and (e.endHours>?2)")
	public Employment getCurrentEmployment(long id, int hoursNow);
	
	@Query("select e from Employment e where e.employee=?1 AND e.pharmacy=?2 AND (e.startHours<=?3 AND e.endHours>?4)")
	public Employment checkIfAppointmentInEmployment(PUser doc, Pharmacy ph, int startH, int endH);

	@Query("select e from Employment e where e.employee=?1")
	public Employment getEmployment(PUser pu);

	@Query("Select e from Employment e where e.employee.email=?1")
	public Optional<Employment> findIfWorks(String email);

	@Query("Select e from Employment e where e.employee.email=?1 and (?2 between e.startHours and e.endHours) and (?3 between e.startHours and e. endHours)")
	public Optional<Employment> findIfOverLapWorks(String email, int startH, int endH);


	@Query("Delete from Employment e where e.pharmacy.id=?1 and e.employee.id=?2")
	public void deleteByEmployeeId(long id, long l);

	@Query("Select e from Employment e where e.employee.id=?1 and e.pharmacy.id=?2")
	public Employment findOneDermatologApotekaByIds(long id, long id2);
	
	@Query("Select e from Employment e where e.employee.id=?1 and e.pharmacy.id=?2")
	public Optional<Employment> findOneDermatologApotekaByIds1(long id, long id2);

}
