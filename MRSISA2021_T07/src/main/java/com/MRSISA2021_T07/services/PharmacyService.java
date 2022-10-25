package com.MRSISA2021_T07.services;

import java.util.Collection;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.MRSISA2021_T07.model.Appointment;

import com.MRSISA2021_T07.dto.PharmacistDTO;
import com.MRSISA2021_T07.dto.PharmacyDTO;

import com.MRSISA2021_T07.model.Dermatologist;

import com.MRSISA2021_T07.model.Employment;

import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;

import com.MRSISA2021_T07.repository.AppointmentRepository;
import com.MRSISA2021_T07.repository.DermatologistRepository;
import com.MRSISA2021_T07.repository.EmploymentRepository;

import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;

@RestController
@RequestMapping("/pharma")
public class PharmacyService {
	@Autowired
	private PharmacyRepository repo;
	@Autowired
	private DermatologistRepository derrepo;
	@Autowired
	private PharmacistRepository parrepo;
	@Autowired
	private AppointmentRepository apprepo;
	@Autowired
	private EmploymentRepository emprepo;
	
	@Autowired
	private PharmacistRepository pcistRepo;
	
	@GetMapping(path= "/pharmacySearch")
	public ResponseEntity<Pharmacy> viewPharmacy(@RequestParam String name)
	{
		Pharmacy pharmacy = repo.findByName(name);
		if(pharmacy == null) {
			return new ResponseEntity<Pharmacy>(HttpStatus.OK);
		}
		return new ResponseEntity<Pharmacy>(pharmacy,HttpStatus.OK);
	}
	
	@PutMapping(path="/updatePharmacy", consumes="application/json")	
	public Pharmacy updatePharmacy(@RequestBody Pharmacy p)
	{
		repo.save(p);
		System.out.println(p);
		return p;
	}	
	
	@GetMapping(path = "/getAllPharmacies")
	public ResponseEntity<List<PharmacyDTO>> getAllPharmacies()
	{
		List<PharmacyDTO> dto = new ArrayList<PharmacyDTO>();
		for(Pharmacy p : repo.findAll())
		{
			dto.add(PharmacyDTO.transform(p));
		}
		return new ResponseEntity<List<PharmacyDTO>>(dto,HttpStatus.OK);
	}
	

	@DeleteMapping(path="/deleteWorker/{email}/{role}")
	public ResponseEntity deleteWorker(@PathVariable String email,@PathVariable String role)
	{
		if(role.equals("DERMA"))
		{
			Dermatologist d = derrepo.findByEmail(email);
			Set<Appointment> a = apprepo.findAllByDoctorId(d.getId());
			if(a.isEmpty())
			{
				Optional<Employment> e = emprepo.findIfWorks(email);
				if(e.isPresent())
				{
					Employment emp = e.get();
//					EntityManager em = new EntityMe;
//					em.persist(emp);
//					em.flush();
//					System.out.println("AAAAAAAAAAAAA" + emp.getId());
					emprepo.delete(emp);
					return new ResponseEntity("success", HttpStatus.OK);
				}
				
				
			}
			else
			{
				return new ResponseEntity("Doctor has appointments to do!", HttpStatus.I_AM_A_TEAPOT);
			}
		}
		else
		{
			Pharmacist d = parrepo.findByEmail(email);
			Set<Appointment> a = apprepo.findAllByDoctorId(d.getId());
			if(a.isEmpty())
			{
				Optional<Employment> e = emprepo.findIfWorks(email);
				if(e.isPresent())
				{
					Employment emp = e.get();
					
					try {
						
						emprepo.deleteById(emprepo.findOneDermatologApotekaByIds(emp.getEmployee().getId(), emp.getPharmacy().getId()).getId());
						//emprepo.deleteByEmployeeId(emp.getPharmacy().getId(),emp.getEmployee().getId());
						System.out.println("AAAAAAAAAAAAA" + emp.getId() + emp.getEmployee().getAddress());
					}catch(Exception e1 ){
						System.out.println("VVV" +e1);
					}
					return new ResponseEntity("success", HttpStatus.OK);
				}
			}
			else
			{
				return new ResponseEntity("Doctor has appointments to do!", HttpStatus.I_AM_A_TEAPOT);
			}
		}
		return new ResponseEntity("error", HttpStatus.I_AM_A_TEAPOT);
	}
	@GetMapping(path = "/getPharmacyEmployees/{id}")
	public ResponseEntity<List<PharmacistDTO>> getPharmacyEmployees(@PathVariable long id)
	{
		List<PharmacistDTO> dto = new ArrayList<PharmacistDTO>();
		for(Pharmacist p : pcistRepo.findAll())
		{
			if(p.getEmployment().getPharmacy().getId() == id)
			{
				dto.add(PharmacistDTO.transform(p));
			}
		}
		return new ResponseEntity<List<PharmacistDTO>>(dto,HttpStatus.OK);
	}
}
