package com.MRSISA2021_T07.services;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.IsoFields;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.DoctorRatingDTO;
import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.Reservation;
import com.MRSISA2021_T07.repository.AppointmentRepository;
import com.MRSISA2021_T07.repository.DermatologistRepository;
import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;
import com.MRSISA2021_T07.repository.ReservationRepository;


@RestController
@RequestMapping("/report")
public class ReportService {

	@Autowired
	AppointmentRepository apprepo;
	
	@Autowired
	PharmacyRepository pharmarepo;
	
	@Autowired
	ReservationRepository resrepo;
	
	@Autowired
	DermatologistRepository dermarepo;
	
	@Autowired
	PharmacistRepository pharmrepo;
	
	//////////////APPOINTMENTS/////////////////////
	
	@GetMapping("/monthReportsApp/{pharmaId}/{year}")
	public Map<String, Integer> monthReportsApp(@PathVariable long pharmaId,@PathVariable int year)
	{
		Optional<Pharmacy> pharma = pharmarepo.findById(pharmaId);
		Pharmacy p = findPharma(pharma);
		
		
		
		Map<String, Integer> monthMap = new HashMap<String, Integer>();
		Set<Appointment> appsDone = apprepo.findAllThatCame(p);
		for (Appointment app : appsDone) {
			if(app.getEndTime().getYear() == year)
			{
				int count = monthMap.getOrDefault(app.getEndTime().getMonth().toString(), 0);
				
				if(monthMap.containsKey(app.getEndTime().getMonth().toString()))
				{
					monthMap.put(app.getEndTime().getMonth().toString(), count+1);
				}
				else {
					monthMap.put(app.getEndTime().getMonth().toString(), 1);
				}
			}
			
		}
//		monthMap.entrySet().forEach(entry -> {
//		    System.out.println(entry.getKey() + " " + entry.getValue());
//		});
		return monthMap;
		
	}
	
	private Pharmacy findPharma(Optional<Pharmacy> pharma) {
		Pharmacy p;
		if(!pharma.isPresent())
		{
			return null;
		}
		else
		{
			p = pharma.get();
			return p;

		}

	}

	@GetMapping("/yearReportsApp/{pharmaId}/{year}")
	public Map<Integer, Integer> yearReportsApp(@PathVariable long pharmaId,@PathVariable int year)
	{
		Optional<Pharmacy> pharma = pharmarepo.findById(pharmaId);
		Pharmacy p = findPharma(pharma);
		
		
		
		Map<Integer, Integer> yearApp = new HashMap<Integer, Integer>();
		Set<Appointment> appsDone = apprepo.findAllThatCame(p);
		
		for (Appointment app : appsDone) {
			if(app.getEndTime().getYear() == year) {
				int count = yearApp.getOrDefault(app.getEndTime().getYear(), 0);
				if(yearApp.containsKey(app.getEndTime().getYear()))
				{
					yearApp.put(app.getEndTime().getYear(), count+1);
				}
				else {
					yearApp.put(app.getEndTime().getYear(), 1);
				}
				
			}
		}
//		yearApp.entrySet().forEach(entry -> {
//		    System.out.println(entry.getKey() + " " + entry.getValue());
//		});
		return yearApp;
		
	}
	@GetMapping("/quarterhReportsApp/{pharmaId}/{year}")
	public Map<Integer, Integer> quarterhReportsApp(@PathVariable long pharmaId,@PathVariable int year)
	{
		Optional<Pharmacy> pharma = pharmarepo.findById(pharmaId);
		Pharmacy p = findPharma(pharma);
		
		
		Map<Integer, Integer> quarterMap = new HashMap<Integer, Integer>();
		Set<Appointment> appsDone = apprepo.findAllThatCame(p);
		for (Appointment app : appsDone) {
			if(app.getEndTime().getYear() == year) {
				int count = quarterMap.getOrDefault(app.getEndTime().get(IsoFields.QUARTER_OF_YEAR), 0);
				
				if(quarterMap.containsKey(app.getEndTime().get(IsoFields.QUARTER_OF_YEAR)))
				{
					quarterMap.put(app.getEndTime().get(IsoFields.QUARTER_OF_YEAR), count+1);
				}
				else {
					quarterMap.put(app.getEndTime().get(IsoFields.QUARTER_OF_YEAR), 1);
				}
			}
			
		}
//		quarterMap.entrySet().forEach(entry -> {
//		    System.out.println(entry.getKey() + " " + entry.getValue());
//		});
		return quarterMap;
		
	}
	
	
	/////////////////////DRUGS///////////////////
	@GetMapping("/monthDrugs/{pharmaId}/{year}")
	public Map<String,Integer> monthDrugs(@PathVariable long pharmaId,@PathVariable int year)
	{
		Optional<Pharmacy> pharma = pharmarepo.findById(pharmaId);
		Pharmacy p = findPharma(pharma);
		
		Map<String, Integer> monthDrugs = new HashMap<String, Integer>();
		Set<Reservation> drugsIssued = resrepo.findAllIssued(p);
		for (Reservation reservation : drugsIssued) {
			if(reservation.getDateReserved().getYear() == year)
			{
				int count = monthDrugs.getOrDefault(reservation.getDateReserved().getMonth().toString(), 0);
				if(monthDrugs.containsKey(reservation.getDateReserved().getMonth().toString()))
				{
					monthDrugs.put(reservation.getDateReserved().getMonth().toString(), count+1);
				}
				else {
					monthDrugs.put(reservation.getDateReserved().getMonth().toString(), 1);
				}
			}
		}
//		monthDrugs.entrySet().forEach(entry -> {
//	    System.out.println(entry.getKey() + " " + entry.getValue());
//		});
		return monthDrugs;
	}
	
	@GetMapping("/quarterDrugs/{pharmaId}/{year}")
	public Map<Integer,Integer> quarterDrugs(@PathVariable long pharmaId,@PathVariable int year)
	{
		Optional<Pharmacy> pharma = pharmarepo.findById(pharmaId);
		Pharmacy p = findPharma(pharma);
		
		Map<Integer, Integer> quarterDrugs = new HashMap<Integer, Integer>();
		Set<Reservation> drugsIssued = resrepo.findAllIssued(p);
		for (Reservation reservation : drugsIssued) {
			if(reservation.getDateReserved().getYear() == year)
			{
				int count = quarterDrugs.getOrDefault(reservation.getDateReserved().get(IsoFields.QUARTER_OF_YEAR), 0);
				if(quarterDrugs.containsKey(reservation.getDateReserved().get(IsoFields.QUARTER_OF_YEAR)))
				{
					quarterDrugs.put(reservation.getDateReserved().get(IsoFields.QUARTER_OF_YEAR), count+1);
				}
				else {
					quarterDrugs.put(reservation.getDateReserved().get(IsoFields.QUARTER_OF_YEAR), 1);
				}
			}
		}
//		quarterDrugs.entrySet().forEach(entry -> {
//	    System.out.println(entry.getKey() + " " + entry.getValue());
//	});
		return quarterDrugs;
	}
	
	@GetMapping("/yearDrugs/{pharmaId}/{year}")
	public Map<Integer,Integer> yearDrugs(@PathVariable long pharmaId,@PathVariable int year)
	{
		Optional<Pharmacy> pharma = pharmarepo.findById(pharmaId);
		Pharmacy p = findPharma(pharma);
		
		Map<Integer, Integer> yearDrugs = new HashMap<Integer, Integer>();
		Set<Reservation> drugsIssued = resrepo.findAllIssued(p);
		for (Reservation reservation : drugsIssued) {
			if(reservation.getDateReserved().getYear() == year)
			{
				int count = yearDrugs.getOrDefault(reservation.getDateReserved().getYear(), 0);
				if(yearDrugs.containsKey(reservation.getDateReserved().getYear()))
				{
					yearDrugs.put(reservation.getDateReserved().getYear(), count+1);
				}
				else {
					yearDrugs.put(reservation.getDateReserved().getYear(), 1);
				}
			}
		}
//		yearDrugs.entrySet().forEach(entry -> {
//	    System.out.println(entry.getKey() + " " + entry.getValue());
//	});
		return yearDrugs;
	}
	
	
	////////////////INCOMES/////////////////////
	@GetMapping("/getIncomes/{pharmaId}/{dateFrom}/{dateTo}")
	public double getIncomes(@PathVariable long pharmaId,@PathVariable String dateFrom,@PathVariable String dateTo)
	{
		//System.out.println("AAAAAAAAAAAAAAAAAAAA" + dateFrom.getClass().getSimpleName() + dateTo);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate dateFd = LocalDate.parse(dateFrom, formatter);
		LocalDate dateTd = LocalDate.parse(dateTo, formatter);
	    
		LocalDateTime dateF = dateFd.atStartOfDay();

		LocalDateTime dateT = dateTd.atStartOfDay();
	    
		double income = 0;
		Optional<Pharmacy> pharma = pharmarepo.findById(pharmaId);
		Pharmacy p = findPharma(pharma);
		Set<Reservation> drugsIssued = resrepo.findAllIssuedBetween(p,dateF,dateT);
		for (Reservation reservation : drugsIssued) {
			income += reservation.getTotalPrice();
		}
		Set<Appointment> apps = apprepo.findAllBetween(p,dateF,dateT);
		for (Appointment appointment : apps) {
			income += appointment.getPrice();
		}
		return income;
	}
	
	///////////////////////AVERAGE GRADES///////////////////
	@GetMapping("/getAveragePharma/{pharmaId}")
	public float getAveragePharma(@PathVariable long pharmaId)
	{
		Optional<Pharmacy> pharma = pharmarepo.findById(pharmaId);
		Pharmacy p = findPharma(pharma);
		return p.getRating();
	}
	
	@GetMapping("/getAverageDoctor/{pharmaId}")
	public List<DoctorRatingDTO> getAverageDoctor(@PathVariable long pharmaId)
	{
		Optional<Pharmacy> pharma = pharmarepo.findById(pharmaId);
		Pharmacy p = findPharma(pharma);
		
		List<Dermatologist> dermas = dermarepo.findAll();
		List<Pharmacist> pharmas = pharmrepo.findAll();
		List<DoctorRatingDTO> dtos = new ArrayList<DoctorRatingDTO>();
		
		for (Dermatologist derma : dermas) {
			for (Employment e : derma.getEmployments()) {
				if(e.getPharmacy().getId() == p.getId()) {
					DoctorRatingDTO dto = new DoctorRatingDTO(derma.getRating(), derma);
					dtos.add(dto);
				}
			}
		}
		
		for (Pharmacist pharmacist : pharmas) {
			if(pharmacist.getEmployment().getPharmacy().getId() == p.getId()) {
				DoctorRatingDTO dto = new DoctorRatingDTO(pharmacist.getRating(), pharmacist);
				dtos.add(dto);
			}
		}
		
		return dtos;
	}
	
}
