package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.hibernate.Hibernate;
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

import com.MRSISA2021_T07.dto.AppointmentDTO;
import com.MRSISA2021_T07.dto.DermatologistDTO;
import com.MRSISA2021_T07.model.Absence;
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.repository.AbsenceRepository;
import com.MRSISA2021_T07.repository.AdminRepository;
import com.MRSISA2021_T07.repository.AppointmentRepository;
import com.MRSISA2021_T07.repository.DermatologistRepository;
import com.MRSISA2021_T07.repository.EmploymentRepository;
import com.MRSISA2021_T07.repository.LoginRepository;
import com.MRSISA2021_T07.repository.PatientRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;

@RestController
@RequestMapping("/derma")
public class DermatologistService {
	@Autowired
	private DermatologistRepository derma;
	@Autowired
	private AppointmentRepository apprepo;
	@Autowired
	private PatientRepository patrepo;
	@Autowired
	private LoginRepository userrepo;
	@Autowired
	private EmploymentRepository emprepo;
	@Autowired
	private AdminRepository adminrepo;
	@Autowired
	private AbsenceRepository absencerepo;
	@Autowired
	private PharmacyRepository pharmarepo;

	
	@GetMapping(path="/getDermatologists")
	public ResponseEntity<List<DermatologistDTO>> getDermatologists()
	{	
		List<DermatologistDTO> sviDermatolozi = new ArrayList<DermatologistDTO>();
		for (Dermatologist d : derma.findAll()) {
			sviDermatolozi.add(DermatologistDTO.transform(d));
		}
		return new ResponseEntity<List<DermatologistDTO>>(sviDermatolozi,HttpStatus.OK);
	}
	
	@GetMapping(path = "/getDermatologist/{id}")
	public Dermatologist getDermatologist(@PathVariable long id) {
		System.out.println(id);
		Optional<Dermatologist> dop = derma.findById(id);
		Dermatologist d;
		System.out.println("prvi korak");
		if(!dop.isPresent()) {
		d = new Dermatologist(123, "Mirko", "Mrkva", "mrki@gmail.com", "111","palih studenata 2", "Novi Sad", "Serbia", 1, "DERMA","1","1","1");
		d = derma.save(d);
		System.out.println("Hardkod");
		}else {
			d = dop.get();
		}
		
		
		//System.out.println(d);
		return d;
	}
	
	@GetMapping(path = "getDermatologistEmail/{email}")
	public long getDermatologist(@PathVariable String email)
	{
		Optional<Dermatologist> d = derma.findEmail(email);
		Dermatologist der;
		if(!d.isPresent())
		{
			return -1;
		}
		else
		{
			der = d.get();
			return der.getId();
		}	
	}
	@GetMapping(path = "getDermatologistEmail1/{email}/{id}")
	public long getDermatologist1(@PathVariable String email,@PathVariable long id)
	{
		Optional<Admin> a = adminrepo.findById(id);
		Admin ad;
		if(!a.isPresent())
		{
			return -1;
		}
		else {
			ad = a.get();
		}
		
		long pharmaID = ad.getWorks();
		Optional<Pharmacy> p = pharmarepo.findById(pharmaID);
		Pharmacy ph;
		if(!p.isPresent())
		{
			return -1;
		}
		else {
			ph = p.get();
		}
		Optional<Dermatologist> d = derma.findEmail(email);
		Dermatologist der;
		if(!d.isPresent())
		{
			return -1;
		}
		else
		{
			der = d.get();
			Optional<Employment> em = emprepo.findOneDermatologApotekaByIds1(der.getId(), ph.getId());
			if(em.isPresent()) {
				return der.getId();
			}
			else {
				return -1;
			}
			
		}	
	}
	
	@GetMapping(path = "/getDermaAppointments/{email}")
	public Set<AppointmentDTO> getAppointmentsDerma(@PathVariable String email) {
		Set<Appointment> apps = derma.findAllByDermaEmail(email);
		Set<AppointmentDTO> appsdto = AppointmentDTO.transformCollection(apps);
		return appsdto;
	}
	
	@PutMapping(path="/updateDermatologist")	
	public Dermatologist updateDermatologist(@RequestBody Dermatologist d) {
		derma.save(d);
		System.out.println(d);
		return d;
	}
	@GetMapping(path = "/getAppointments/{id}")
	public Set<AppointmentDTO> getAppointments(@PathVariable long id) {
		Optional<Dermatologist> dop = derma.findById(id);
		Dermatologist d;
		Set<Appointment> apps = new HashSet<Appointment>();
		if(dop.isPresent()) {
			
			d = dop.get();
			apps = (Set<Appointment>) Hibernate.unproxy(d.getAppointments());
			//d.getEmployments();
			System.out.println(apps.size());
			Set<AppointmentDTO> appsdto = AppointmentDTO.transformCollection(apps);
		
			return appsdto;
		}
		return null;
	}
	@PostMapping(path = "/makeAppointment/{email}/{id}", consumes="application/json")
	public ResponseEntity addDermaAppointment(@PathVariable String email,@PathVariable long id, @RequestBody AppointmentDTO ap)
	{
		//poveca sati za 2
		ap.setEndTime(ap.getEndTime().withHour(ap.getEndTime().getHour() + 2));
		
		Optional<Dermatologist> d = derma.findEmail(email);
		if(!d.isPresent())
		{
			return new ResponseEntity("Wrong doctor email!", HttpStatus.I_AM_A_TEAPOT);
		}
		Dermatologist dermatologist;
		dermatologist = d.get();
		PUser pu = d.get();
		Employment emp = emprepo.getEmployment(pu);
		if(emp == null) {
			return new ResponseEntity("Can not book appointment", HttpStatus.I_AM_A_TEAPOT);
		}
		Optional<Absence> absence = absencerepo.findAbsence(dermatologist,ap.getStartTime().toLocalDate());
		if(absence.isPresent())
		{
			return new ResponseEntity("Dermatologist is on vacation in that time", HttpStatus.I_AM_A_TEAPOT);
		}
		//provera da li je u toj apoteci dermatolog
		Pharmacy ph = emp.getPharmacy();
		//potrebno je imati listu dermatologa iz apoteke
//		
		long pharmaId = adminrepo.getPharmaId(id);
		
		if(ph.getId() != pharmaId)
		{
			return new ResponseEntity("Dermatologist does not work there", HttpStatus.I_AM_A_TEAPOT);
		}
		System.out.println(ap.getStartTime().getHour() + "aaaaaaaaaaaa"+ ap.getEndTime() + "BBBBBB" + ap.getEndTime().getHour());
		//da li tada radi tamo
		Employment apemp = emprepo.checkIfAppointmentInEmployment(pu, ph, ap.getStartTime().getHour(), ap.getEndTime().getHour());
		if(apemp==null) {
			return new ResponseEntity("Doctor not working at "+ ph.getName() +" at that time!", HttpStatus.I_AM_A_TEAPOT);
		}
		//da li tada ima zakazano
		Set<Appointment> docapo = apprepo.findAllOverlapingIntervalDoctor(ap.getStartTime(), ap.getEndTime(), pu);
		if(!docapo.isEmpty()) {
			return new ResponseEntity("Doctor has appointment at that time", HttpStatus.I_AM_A_TEAPOT);
		}
		Patient p = null;
		apprepo.save(new Appointment(ap.getPrice(), ap.getStartTime(), ap.getEndTime(), ph, dermatologist));
		
		return new ResponseEntity("Appointment successfully booked!", HttpStatus.OK);

	}
	
}
