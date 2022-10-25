package com.MRSISA2021_T07.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.AppDrugDTO;
import com.MRSISA2021_T07.dto.AppointmentDTO;
import com.MRSISA2021_T07.dto.ConsultationDTO;
import com.MRSISA2021_T07.model.Absence;
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugAppointment;
import com.MRSISA2021_T07.model.DrugPharmacy;
import com.MRSISA2021_T07.model.DrugReservation;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.Loyalty;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.Reservation;
import com.MRSISA2021_T07.repository.AbsenceRepository;
import com.MRSISA2021_T07.repository.AdminRepository;
import com.MRSISA2021_T07.repository.AppointmentRepository;
import com.MRSISA2021_T07.repository.DermatologistRepository;
import com.MRSISA2021_T07.repository.DrugAppointmentRepository;
import com.MRSISA2021_T07.repository.DrugPharmaRepository;
import com.MRSISA2021_T07.repository.DrugRepository;
import com.MRSISA2021_T07.repository.EmploymentRepository;
import com.MRSISA2021_T07.repository.LoginRepository;
import com.MRSISA2021_T07.repository.LoyaltyRepository;
import com.MRSISA2021_T07.repository.PatientRepository;
import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;
import com.MRSISA2021_T07.repository.ReservationRepository;

@RestController
@RequestMapping("/appointment")
@Service
public class AppointmentService {
	static long Id = 6;
	
	@Autowired
	private AbsenceRepository abrepo;
	@Autowired
	private AppointmentRepository apprepo;
	@Autowired
	private PatientRepository patrepo;
	@Autowired
	private LoginRepository userrepo;
	@Autowired
	private DermatologistRepository dermrepo;
	@Autowired
	private EmploymentRepository emprepo;
	@Autowired
	private PharmacistRepository pharmaRepo;
	@Autowired
	private PharmacyRepository pharmacyRepo;
	@Autowired
	private DrugPharmaRepository drugPhRepo;
	@Autowired
	private DrugRepository drugRepo;
	@Autowired
	private DrugAppointmentRepository drapRepo;
	@Autowired
	private ReservationRepository resRepo;
	@Autowired
	private EmailService smail;
	@Autowired
	private AdminRepository adrepp;
	
	@GetMapping(path = "/getDoctorAppointments/{id}/{before}")
	public Set<AppointmentDTO> getAppointments(@PathVariable long id, @PathVariable boolean before) {
		//System.out.println(before);
		Set<Appointment> apps;
		if(before) {

			apps = apprepo.findAllByDoctorIdBefore(id, LocalDateTime.now());
		}
		else {
			apps = apprepo.findAllByDoctorId(id);
		}
		//System.out.println(apps.size());
		Set<AppointmentDTO> appsdto = AppointmentDTO.transformCollection(apps);
		
		return appsdto;
	}
	
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	@PostMapping(path="/submitReport/{id}/{report}", consumes="application/json")
	public ResponseEntity submitReport(@PathVariable long id, @PathVariable String report, @RequestBody List<AppDrugDTO> drugs) {
		String err =  "Can not submit report. \n";
		Appointment app = apprepo.findById(id).get();
		Pharmacy ph = app.getPharmacy();
		PUser pat = app.getPatient(); 
		Admin a = adrepp.getPharmaById(ph.getId());
		boolean allow = true;
		boolean pass = true;
		Set<DrugAppointment> draps = new HashSet<DrugAppointment>();
		Set<DrugReservation> drese = new HashSet<DrugReservation>();
		Reservation r = new Reservation();
		Collections.sort(drugs);
		int totalPrice = 0;
		for(AppDrugDTO adt : drugs) {
			pass = true;
			Drug dr = drugRepo.findByCode(adt.getDrugCode());
			DrugPharmacy dpo = drugPhRepo.findByDrugAndPharmacy(dr, ph);
			if(dpo==null) {
				pass = false;
				err+= adt.getName()+" not available in this Pharmacy. ";
				smail.sendEmail(a.getEmail(), adt.getName()+" requested but not available in this Pharmacy. ", "Missing drug at pharmacy");
			}else {
				if(adt.getQuantity()>dpo.getAmount()) {
					pass = false;
					err += "Requested "+adt.getQuantity()+" "+adt.getName()+" only "+dpo.getAmount() +" available. ";
					smail.sendEmail(a.getEmail(), "Requested "+adt.getQuantity()+" "+adt.getName()+" only "+dpo.getAmount() +" available. ", "Not enough drugs");
				}else {
					
					DrugAppointment drap = new DrugAppointment(app, dr, adt.getQuantity(), adt.getTakingPeriod());
					draps.add(drap);
					DrugReservation dres = new DrugReservation(r, dr, adt.getQuantity(), dpo.getPrice());
					drese.add(dres);
					totalPrice += adt.getQuantity()*dpo.getPrice();
				}
			}
			if(!pass) {
					err+=" Possible replacement drugs are: ";
				for(Drug rep : drugRepo.findByCodeReplacements(dr.getDrugCode())) {
					err+= rep.getName()+" ";
				}
				err+="\n";
				allow = false;
			}
		}
		//System.out.println(err);
		if(!allow) {
			return new ResponseEntity(err, HttpStatus.OK);
		}
		for(AppDrugDTO adt : drugs) {
			Drug dr = drugRepo.findByCode(adt.getDrugCode());
			DrugPharmacy dpo = drugPhRepo.findByDrugAndPharmacy(dr, ph);
			dpo.setAmount(dpo.getAmount()-adt.getQuantity());
			drugPhRepo.save(dpo);
		}
		app.setDrugs(draps);
		app.setAppeared(true);
		
		// Loyalty system
		
		ArrayList<Loyalty> lista = new ArrayList<Loyalty>();
		lista = (ArrayList<Loyalty>) loyal.findAll();
		int cena = app.getPrice();
		LoyaltyService ls = new LoyaltyService();
		Patient p = (Patient) pat;
		//ls.addPointsAppointment(p, app);
		double price = ls.applyDiscountAppointment(p, app, lista);
		//patrepo.save(p);
		app.setPrice((int) price);
		apprepo.save(app);
		r.setDrugs(drese);
		r.setIssued(false);
		r.setPharmacy(ph);
		r.setDateReserved(LocalDateTime.now());
		r.setTotalPrice(totalPrice);
		resRepo.save(r);
		smail.sendEmail(pat.getEmail(), "Code of new reservation is "+r.getId(), "New reservation made.");
		return new ResponseEntity("", HttpStatus.OK);
	}
	
	@PostMapping(path="/didPatientCome/{id}/{came}")
	public ResponseEntity didPatientCome(@PathVariable long id, @PathVariable boolean came) {
		Appointment app = apprepo.findById(id).get();
		//System.out.println("ej");
		//Patient p = patrepo.findByEmail(app.getPatient().getEmail());
		app.setAppeared(came);
		apprepo.save(app);
		
		return new ResponseEntity("", HttpStatus.OK);
	}
	
	@PostMapping(path= "/newDoctorAppointment/{id}", consumes="application/json")
	public ResponseEntity addDoctorAppoinetment(@PathVariable long id, @RequestBody AppointmentDTO ap) {
		Optional<PUser> pu = userrepo.findById(id);
		if(pu.isEmpty()) {
			return new ResponseEntity("Wrong doctor id!", HttpStatus.I_AM_A_TEAPOT);
		};
		LocalDateTime now = LocalDateTime.now();
		int nowHour = now.getHour();
		System.out.println(nowHour);
		PUser doc = pu.get();
		Employment currEmp = emprepo.getCurrentEmployment(id, nowHour);
		if(currEmp==null) {
			return new ResponseEntity("Can not book appointment while not working", HttpStatus.I_AM_A_TEAPOT);
		}
		//System.out.println((currEmp.getPharmacy()));
		Pharmacy ph = currEmp.getPharmacy();
		Patient p = patrepo.findByEmail(ap.getMail());
		System.out.println(p);
		Set<Appointment> patapo = apprepo.findAllOverlapingIntervalPatient(ap.getStartTime(), ap.getEndTime(), p);
		if(!patapo.isEmpty()) {
			return new ResponseEntity("Patient already has appointment at that time!", HttpStatus.I_AM_A_TEAPOT);
		}
		Employment apemp = emprepo.checkIfAppointmentInEmployment(doc, ph, ap.getStartTime().getHour(), ap.getEndTime().getHour());
		if(apemp==null) {
			return new ResponseEntity("Doctor not working at "+ ph.getName() +" at that time!", HttpStatus.I_AM_A_TEAPOT);
		}
		Set<Appointment> docapo = apprepo.findAllOverlapingIntervalDoctor(ap.getStartTime(), ap.getEndTime(), doc);
		if(!docapo.isEmpty()) {
			return new ResponseEntity("Doctor has appointment at that time", HttpStatus.I_AM_A_TEAPOT);
		}
		Set<Absence> docab = abrepo.findAllAbsencedInInterval(doc, ap.getStartTime().toLocalDate(), ap.getEndTime().toLocalDate());
		if(!docab.isEmpty()) {
			return new ResponseEntity("Doctor is absent at that time", HttpStatus.I_AM_A_TEAPOT);
		}
		
		
		apprepo.save(new Appointment(p,ap.getPrice(), ap.getStartTime(), ap.getEndTime(), ph, doc));
		smail.sendEmail(p.getEmail(), "You have new appintment at "+ap.getStartTime()+" in "+ph.getName()+
				" The doctor for the appointment is "+doc.getName()+" "+doc.getSurname(), "New appointment");
		//System.out.println(ap.getEndTime().getMinute());
		return new ResponseEntity("Appointment successfully booked!", HttpStatus.I_AM_A_TEAPOT);
	}
	
	@PostMapping(path= "/takeDoctorAppointment/{id}/{mail}/{appid}")
	public ResponseEntity takeDoctorAppoinetment(@PathVariable long id, @PathVariable String mail, @PathVariable long appid) {
		Optional<PUser> pu = userrepo.findById(id);
		if(pu.isEmpty()) {
			return new ResponseEntity("Wrong doctor id!", HttpStatus.I_AM_A_TEAPOT);
		};
		LocalDateTime now = LocalDateTime.now();
		int nowHour = now.getHour();
		System.out.println(nowHour);
		PUser doc = pu.get();
		Employment currEmp = emprepo.getCurrentEmployment(id, nowHour);
		if(currEmp==null) {
			return new ResponseEntity("Can not book appointment while not working", HttpStatus.I_AM_A_TEAPOT);
		}
		//System.out.println((currEmp.getPharmacy()));
		Optional<Appointment> appo = apprepo.findById(appid);
		if(appo.isEmpty()) {
			return new ResponseEntity("No such appointment!", HttpStatus.I_AM_A_TEAPOT);
		}
		Appointment ap = appo.get();
		Pharmacy ph = currEmp.getPharmacy();
		Patient p = patrepo.findByEmail(mail);
		System.out.println(ap.getStartTime()+ " pregled "+ap.getEndTime());
		Set<Appointment> patapo = apprepo.findAllOverlapingIntervalPatient(ap.getStartTime(), ap.getEndTime(), p);
		if(!patapo.isEmpty()) {
			for(Appointment app : patapo) {
				System.out.println(app.getStartTime()+" do "+app.getEndTime());
			}
			System.out.println();
			return new ResponseEntity("Patient already has appointment at that time!", HttpStatus.I_AM_A_TEAPOT);
		}
		ap.setPatient(p);
		apprepo.save(ap);
		smail.sendEmail(p.getEmail(), "You have new appintment at "+ap.getStartTime()+" in "+ph.getName()+
				" The doctor for the appointment is "+doc.getName()+" "+doc.getSurname(), "New appointment");
		System.out.println("Oi");
		return new ResponseEntity("Appointment successfully booked!", HttpStatus.OK);
		
	}
	
	@GetMapping(path= "/getCurrentPatient/{id}")
	public ResponseEntity<String> getCurrentPatient(@PathVariable long id) {
		//Optional<PUser> pu = userrepo.findById(id);
		Appointment a = apprepo.findCurrentAppointment(id, LocalDateTime.now());
		
		return new ResponseEntity<String>(a.getPatient().getEmail(), HttpStatus.OK);
	}
	
	@GetMapping(path= "/getFreeAppointments")
	public ResponseEntity<List<AppointmentDTO>> getFreeAppointments()
	{
		List<Appointment> allAppointments = apprepo.findAll();
		List<AppointmentDTO> freeAppointments = new ArrayList<AppointmentDTO>();
		LocalDateTime lt = LocalDateTime.now();
		for (Appointment appointment : allAppointments) 
		{
			if(appointment.getPatient() == null && appointment.getStartTime().isAfter(lt) && appointment.getDoctor().getRole().equalsIgnoreCase("DERMA"))
			{
				freeAppointments.add(AppointmentDTO.transform(appointment));
			}
		}
		return new ResponseEntity<List<AppointmentDTO>>(freeAppointments, HttpStatus.OK);
	}
	
	@GetMapping(path= "/getPendingAppointments/{email}")
	public ResponseEntity<List<AppointmentDTO>> getPendingAppointments(@PathVariable String email)
	{
		List<Appointment> allAppointments = apprepo.findAll();
		List<AppointmentDTO> pendingAppointments = new ArrayList<AppointmentDTO>();
		LocalDateTime lt = LocalDateTime.now();
		for (Appointment appointment : allAppointments) 
		{
			if(appointment.getPatient() == null)
			{
				continue;
			}
			if(appointment.getPatient().getEmail().equalsIgnoreCase(email))
			{
				if(appointment.getStartTime().isAfter(lt))
				{
					if(appointment.getDoctor().getRole().equals("DERMA"))
					{
						pendingAppointments.add(AppointmentDTO.transform(appointment));	

					}
				}
			}
			
		}
		return new ResponseEntity<List<AppointmentDTO>>(pendingAppointments, HttpStatus.OK);
	}
	
	@Autowired
	private LoyaltyRepository loyal;
	
	@PutMapping(path="/reserveAppointment/{email}", consumes="application/json")
	public void reserveAppointment(@PathVariable String email, @RequestBody AppointmentDTO appDTO)
	{
		LoyaltyService ls = new LoyaltyService();
		Optional<Appointment> appointment = apprepo.findById(appDTO.getId());
		if(appointment != null)
		{
			Patient patient = patrepo.findByEmail(email);
			appointment.get().setPatient(patient);
			
			// dodao loyalty discount
			ArrayList<Loyalty> lista = new ArrayList<Loyalty>();
			lista = (ArrayList<Loyalty>) loyal.findAll();
			double price = ls.applyDiscountAppointment(patient, appointment.get(), lista);
			appointment.get().setPrice((int)price);
			apprepo.save(appointment.get());
		}
		return;
	}
	
	@PutMapping(path="/cancelAppointment/{email}", consumes="application/json")
	public ResponseEntity<Boolean> cancelAppointment(@PathVariable String email, @RequestBody AppointmentDTO appDTO)
	{
		Optional<Appointment> appointment = apprepo.findById(appDTO.getId());
		if(appointment != null)
		{
			LocalDateTime thisMoment = LocalDateTime.now();
			LocalDateTime startingTime = appointment.get().getStartTime();
			if(thisMoment.plusDays(1).isAfter(startingTime))
			{
				return new ResponseEntity<Boolean>(false, HttpStatus.OK);
			}
			appointment.get().setPatient(null);
			apprepo.save(appointment.get());
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}
	
	@GetMapping(path="/getPastAppointments/{email}")
	public ResponseEntity<List<AppointmentDTO>> getPastAppointments(@PathVariable String email)
	{
		List<AppointmentDTO> appos = new ArrayList<AppointmentDTO>();  
		LocalDateTime thisMoment = LocalDateTime.now();
		for (Appointment appointment : apprepo.findAll()) 
		{
			try
			{
				if(thisMoment.isAfter(appointment.getEndTime()) && appointment.getDoctor().getRole().equalsIgnoreCase("DERMA") && appointment.getPatient().getEmail().equalsIgnoreCase(email))
				{
					appos.add(AppointmentDTO.transform(appointment));
				}	
			}
			catch (Exception e) {}
			
		}
		return new ResponseEntity<List<AppointmentDTO>>(appos, HttpStatus.OK);
	}
	
	@GetMapping(path="/getPastConsultations/{email}")
	public ResponseEntity<List<AppointmentDTO>> getPastConsultations(@PathVariable String email)
	{
		List<AppointmentDTO> appos = new ArrayList<AppointmentDTO>();  
		LocalDateTime thisMoment = LocalDateTime.now();
		for (Appointment appointment : apprepo.findAll()) 
		{
			try
			{
				if(thisMoment.isAfter(appointment.getEndTime()) && appointment.getDoctor().getRole().equalsIgnoreCase("PHARMA") && appointment.getPatient().getEmail().equalsIgnoreCase(email))
				{
					appos.add(AppointmentDTO.transform(appointment));
				}	
			}
			catch (Exception e) {}
			
		}
		return new ResponseEntity<List<AppointmentDTO>>(appos, HttpStatus.OK);
	}

	
	@PutMapping(path="/isPharmacistAvailable", consumes="application/json")
	public boolean isPharmacistAvailable(@RequestBody AppointmentDTO dto)
	{
		boolean postoji = false;
		for(Appointment a : apprepo.findAll())
		{
			if(a.getDoctor().getId() == dto.getDoctorID())
			{
				dto.setStartTime(dto.getStartTime().plusHours(2));
				dto.setEndTime(dto.getEndTime().plusHours(2));
				if(dto.getStartTime().isAfter(a.getStartTime()) && dto.getStartTime().isBefore(a.getEndTime()))
				{
					return false;
				}	
				if(dto.getEndTime().isAfter(a.getStartTime()) && dto.getEndTime().isBefore(a.getEndTime()))
				{
					return false;
				}
				if(dto.getStartTime().isBefore(a.getStartTime()) && dto.getEndTime().isAfter(a.getEndTime()))
				{
					return false;
				}
				if(dto.getStartTime().isAfter(a.getStartTime()) && dto.getEndTime().isBefore(a.getEndTime()))
				{
					return false;
				}
				if(dto.getStartTime().equals(a.getStartTime()))
				{
					return false;
				}
				if(dto.getEndTime().equals(a.getEndTime()))
				{
					return false;
				}
				
			}
		}
		return true;
	}
	
	
	@PostMapping(path="/createConsultation/{email}", consumes="application/json")
	public boolean createConsultation(@PathVariable String email,@RequestBody AppointmentDTO dto)
	{
		try
		{
			Appointment a = new Appointment();
			Pharmacist pt = pharmaRepo.findById(dto.getDoctorID()).get();
			Pharmacy ph = pharmacyRepo.findById(dto.getPharmacyID()).get();
			Patient p = patrepo.findByEmail(email);
			a.setPharmacy(ph);
			a.setDoctor(pt);
			a.setPatient(p);
			a.setStartTime(dto.getStartTime().plusHours(2));
			a.setEndTime(dto.getEndTime().plusHours(2));
			
			apprepo.save(a);
			return true;
		}
		catch (Exception e) { return false;}
	}
	
	@GetMapping(path= "/getPendingConsultations/{email}")
	public ResponseEntity<List<ConsultationDTO>> getPendingConsultations(@PathVariable String email)
	{

		List<ConsultationDTO> dtos = new ArrayList<ConsultationDTO>();
		for(Appointment a : apprepo.findAll())
		{
			if(a.getPatient() == null)
			{
				continue;
			}
			if(a.getPatient().getEmail().equalsIgnoreCase(email))
			{
				if(a.getStartTime().isAfter(LocalDateTime.now()))
				{
					if(a.getDoctor().getRole().equalsIgnoreCase("PHARMA"))
					{
						dtos.add(ConsultationDTO.transform(a));	
					}
				}
			}
		}
		return new ResponseEntity<List<ConsultationDTO>>(dtos, HttpStatus.OK);			
		
	}
	
	@PutMapping(path="/cancelConsultation/{id}")
	public boolean cancelConsultation(@PathVariable long id)
	{
		Appointment a = apprepo.findById(id).get();
		LocalDateTime thisMoment = LocalDateTime.now();
		LocalDateTime startingTime = a.getStartTime();
		if(thisMoment.plusDays(1).isAfter(startingTime))
		{
			return false;
		}
		a.setStartTime(a.getStartTime().minusYears(2000));
		a.setEndTime(a.getEndTime().plusYears(2000));
		apprepo.save(a);
		return true;
	}

}

