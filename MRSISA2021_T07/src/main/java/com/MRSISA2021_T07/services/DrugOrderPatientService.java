package com.MRSISA2021_T07.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.MRSISA2021_T07.dto.DrugOrderPatientDTO;
import com.MRSISA2021_T07.dto.DrugPharmacyDTO;
import com.MRSISA2021_T07.dto.PatientDTO;
import com.MRSISA2021_T07.dto.PharmacistDTO;
import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugOrder;
import com.MRSISA2021_T07.model.DrugOrderPatient;
import com.MRSISA2021_T07.model.Loyalty;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.repository.DrugOrderPatientRepository;
import com.MRSISA2021_T07.repository.DrugRepository;
import com.MRSISA2021_T07.repository.LoyaltyRepository;
import com.MRSISA2021_T07.repository.PatientRepository;
import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;

@RestController
@RequestMapping("/patientOrder")
public class DrugOrderPatientService {
	
	@Autowired
	private DrugOrderPatientRepository orderRepo;
	
	@Autowired
	private PatientRepository patRepo;
	
	@Autowired
	private DrugRepository drugRepo;
	
	@Autowired
	private PharmacyRepository pharmacyRepo;
	
	//@Autowired
	//private LoyaltyRepository loyal;
	
	
	@GetMapping(path="/getMyFinishedOrders/{email}")
	public ResponseEntity<List<DrugOrderPatientDTO>> getFinishedOrders(@PathVariable String email)
	{
		List<DrugOrderPatientDTO> dtoList = new ArrayList<DrugOrderPatientDTO>();
		for(DrugOrderPatient dop : orderRepo.findAll())
		{
			if(dop.getPatient().getEmail().equalsIgnoreCase(email) && !dop.isCanceled() && LocalDate.now().isAfter(dop.getRecivingDate()))
			{
				dtoList.add(DrugOrderPatientDTO.transform(dop));	
			}
		}
		
		return new ResponseEntity<List<DrugOrderPatientDTO>>(dtoList,HttpStatus.OK);
	}
	
	@GetMapping(path="/getMyCurrentOrders/{email}")
	public ResponseEntity<List<DrugOrderPatientDTO>> getCurrentOrders(@PathVariable String email)
	{
		List<DrugOrderPatientDTO> dtoList = new ArrayList<DrugOrderPatientDTO>();
		for(DrugOrderPatient dop : orderRepo.findAll())
		{
			if(dop.getPatient().getEmail().equalsIgnoreCase(email) && !dop.isCanceled() && !dop.isRecived() && dop.getRecivingDate().isAfter(LocalDate.now()))
			{
				dtoList.add(DrugOrderPatientDTO.transform(dop));
			}
		}
		
		return new ResponseEntity<List<DrugOrderPatientDTO>>(dtoList,HttpStatus.OK);
	}
	
	@PutMapping(path="/cancelCurrentOrder")
	public boolean cancelCurrentOrder(@RequestBody DrugOrderPatientDTO dto)
	{
		LocalDate thisMoment = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate recivingDate = LocalDate.parse(dto.getRecivingDate().trim(), formatter);
		
		for(DrugOrderPatient dop : orderRepo.findAll())
		{
			if(dop.getId() == dto.getOrderID())
			{
				if(thisMoment.plusDays(2).isAfter(recivingDate))
				{
					return false;
				}
				dop.setCanceled(true);
				orderRepo.save(dop);
				return true;
			}
		}
		return false;
	}
	
	@PostMapping(path="/createDrugOrder", consumes="application/json")
	public boolean createDrugOrder(@RequestBody DrugOrderPatientDTO dto)
	{
		DrugOrderPatient order = new DrugOrderPatient();
		Patient patient = patRepo.findByEmail(dto.getPatientEmail());
		Drug drug = drugRepo.findById(dto.getDrugID()).get();
		Pharmacy pharmacy = pharmacyRepo.findById(dto.getPharmacyID()).get();
		
		String str = dto.getRecivingDate().trim();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate recivingDate = LocalDate.parse(str, formatter);
		
		order.setPatient(patient);
		order.setDrug(drug);
		order.setPharmacy(pharmacy);
		order.setPrice(dto.getPrice());
		//ArrayList<Loyalty> lista = new ArrayList<Loyalty>();
		//lista = (ArrayList<Loyalty>) loyal.findAll();
		//double cena = dto.getPrice();
		//LoyaltyService ls = new LoyaltyService();
		//double price = ls.applyDiscountDrug(patient, cena);
		//order.setPrice(price);
		order.setQuantity(dto.getQuantity());
		order.setRecived(false);
		order.setStartDate(LocalDate.now());
		order.setRecivingDate(recivingDate);
		order.setCanceled(false);
		orderRepo.save(order);
		return true;
	}
}
