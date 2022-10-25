package com.MRSISA2021_T07.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.model.Absence;
import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.repository.AbsenceRepository;
import com.MRSISA2021_T07.repository.AppointmentRepository;
import com.MRSISA2021_T07.repository.LoginRepository;

@RestController
@RequestMapping("/absence")
public class AbsenceService {
	@Autowired
	private AbsenceRepository abrepo;
	@Autowired
	private LoginRepository userrepo;
	@Autowired
	private AppointmentRepository appprepo;
	@Autowired
	private EmailService emailservice;
	
	@GetMapping(path = "/getDoctorAbsences/{id}/{before}")
	public Set<Absence> getDoctorAbsences(@PathVariable long id, @PathVariable boolean before) {
		//System.out.println(before);
		Set<Absence> apps;
		if(before) {

			apps = abrepo.findAllByDoctorIdBefore(id, LocalDateTime.now());
		}
		else {
			apps = abrepo.findAllByDoctorId(id);
		}
		
		return apps;
	}
	
	@PostMapping(path= "/requestAbsence/{id}", consumes="application/json")
	public ResponseEntity requestAbsence(@PathVariable long id, @RequestBody Absence ab) {
		//LocalDateTime start = new LocalDateTime(ab.getStartDate(), LocalTime.MIDNIGHT);
		
		Optional<PUser> pu = userrepo.findById(id);
		
		if(pu.isEmpty()) {
			return new ResponseEntity("Wrong doctor id!", HttpStatus.I_AM_A_TEAPOT);
		}
		PUser doc = pu.get();
		ab.setDoctor(doc);
		//System.out.println(ab.getStartDate().atStartOfDay());
		appprepo.findAllOverlapingIntervalDoctor(ab.getStartDate().atStartOfDay(), ab.getEndDate().atStartOfDay(), doc);
		Set<Appointment> docapo = appprepo.findAllOverlapingIntervalDoctor(ab.getStartDate().atStartOfDay(), ab.getEndDate().atStartOfDay(), doc);
		System.out.println(ab.getStartDate()+ " "+ab.getEndDate()+" "+ab.getDescription());
		if(!docapo.isEmpty()) {
			return new ResponseEntity("Doctor has an appointment at that time", HttpStatus.I_AM_A_TEAPOT);
		}
		abrepo.save(ab);
		
		return  new ResponseEntity("Absence requested successfully!", HttpStatus.OK);
		
	}
	
	@GetMapping(path="/getAllAbsences")
	public List<Absence> getAllAbsences(){
		return abrepo.findAll();
	}
	
	@GetMapping(path="/getAllNotApproved")
	public Set<Absence> getAllNotApproved(){
		Set<Absence> absences = abrepo.findAllNotApproved();
		return absences;
	}
	
	@PutMapping(path="/approveAbsence/{id}/{email}")
	public ResponseEntity approveAbsence(@PathVariable long id,@PathVariable String email){
		Optional<Absence> a = abrepo.findById(id);
		Absence absence;
		if(!a.isPresent())
		{
			return new ResponseEntity("Invalid!", HttpStatus.I_AM_A_TEAPOT);
		}
		else
			absence = a.get();
		
		absence.setApproved(true);
		abrepo.save(absence);
		sendEmail(email,"Absence approved!");
		return  new ResponseEntity("success", HttpStatus.OK);
	}
	
	private void sendEmail(String email, String reason) {
		String title = "Absence decision";
		emailservice.sendEmail(email,reason,title);	
		
	}

	@PutMapping(path="/disapproveAbsence/{id}/{email}/{reason}")
	public ResponseEntity disapproveAbsence(@PathVariable long id,@PathVariable String email,@PathVariable String reason){
		Optional<Absence> a = abrepo.findById(id);
		Absence absence;
		if(!a.isPresent())
		{
			return new ResponseEntity("Invalid!", HttpStatus.I_AM_A_TEAPOT);
		}
		else
			absence = a.get();
		
		absence.setApproved(false);
		abrepo.save(absence);
		sendEmail(email, reason);
		return  new ResponseEntity("success", HttpStatus.OK);
	}
}
