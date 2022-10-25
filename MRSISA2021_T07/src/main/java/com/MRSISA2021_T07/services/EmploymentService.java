package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.EmploymentDTO;
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.repository.AdminRepository;
import com.MRSISA2021_T07.repository.DermatologistRepository;
import com.MRSISA2021_T07.repository.EmploymentRepository;
import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;

@RestController
@RequestMapping("/employee")
public class EmploymentService {
	@Autowired
	private EmploymentRepository emprepo;
	
	@Autowired
	private PharmacistRepository pharmaRepo;
	
	@Autowired
	private DermatologistRepository dermaRepo;
	
	@Autowired
	private AdminRepository adminRepo;
	
	@Autowired
	private PharmacyRepository prepo;
	
	
	@GetMapping(path="/getPharmacyAdmin")
	public ResponseEntity<Admin> getAdmin(@RequestParam String email)
	{
		Admin admin = adminRepo.findByEmail(email);
		if(admin == null)
		{
			return new ResponseEntity<Admin>(HttpStatus.OK);
		}
		return new ResponseEntity<Admin>(admin,HttpStatus.OK);
	}
	
	@GetMapping(path="/getPharmacyEmployees")
	public ResponseEntity<List<PUser>> getEmployees(@RequestParam String works)
	{
		List<PUser> lista = new ArrayList<PUser>();
		
		List<Dermatologist> dermaList = dermaRepo.findAll();
		for (Dermatologist dermatologist : dermaList) 
		{
			if(dermatologist.getWorksID().equalsIgnoreCase(works))
			{
				PUser user = new PUser();
				user.setRole("Dermatologist");
				user.setEmail(dermatologist.getEmail());
				user.setName("5");
				lista.add(user);
			}
		}
		
		List<Pharmacist> pharmaList = pharmaRepo.findAll();
		for (Pharmacist pharmacist : pharmaList) 
		{
			if(pharmacist.getWorksID().equalsIgnoreCase(works))
			{
				PUser user = new PUser();
				user.setRole("Pharmacist");
				user.setEmail(pharmacist.getEmail());
				user.setName("5");
				lista.add(user);
			}
		}
		return new ResponseEntity<List<PUser>>(lista,HttpStatus.OK);
	}
	
	@GetMapping(path= "/employeeGrades")
	public ResponseEntity<PUser> viewPharmacy(@RequestParam String email)
	{
		
		PUser user = new PUser();
		Dermatologist dermatologist = dermaRepo.findByEmail(email);
		if(dermatologist != null)
		{
			user.setRole("Dermatologist");
			user.setName(dermatologist.getName());
			user.setSurname(dermatologist.getSurname());
			user.setEmail(dermatologist.getEmail());
			return new ResponseEntity<PUser>(user,HttpStatus.OK);
		}
		Pharmacist pharmacist = pharmaRepo.findByEmail(email);
		if(pharmacist != null)
		{
			user.setRole("Pharmacist");
			user.setName(dermatologist.getName());
			user.setSurname(dermatologist.getSurname());
			user.setEmail(dermatologist.getEmail());
		}
		return new ResponseEntity<PUser>(HttpStatus.OK);
	}
	
	@PostMapping(path="/makeEmployee/{num}",consumes = "application/json")
	public ResponseEntity makeEmployee(@PathVariable int num,@RequestBody EmploymentDTO dto)
	{
		//System.out.println("VVVV" + dto.getEmail());
		PUser p;
		if(num == 1) {
			 p = dermaRepo.findByEmail(dto.getEmail());
		}
		else {
			 p = pharmaRepo.findByEmail(dto.getEmail());
		}
		System.out.println(p.getEmail() + num);
		Optional<Employment> emp = emprepo.findIfOverLapWorks(dto.getEmail(),dto.getStartH(),dto.getEndH());
		if(emp.isPresent())
		{
			return new ResponseEntity("Doctor already works somewhere else in that time!", HttpStatus.I_AM_A_TEAPOT);
		}
		Optional<Pharmacy> pharma = prepo.findById(dto.getPharmaId());
		
		Pharmacy ph = pharma.get();
		Employment e = new Employment();
		e.setEmployee(p);
		e.setEndHours(dto.getEndH());
		e.setStartHours(dto.getStartH());
		e.setPharmacy(ph);
		emprepo.save(e);
		//System.out.println("AAAAAAAAAA" + e.getEmployee().getName());
		return new ResponseEntity("Success", HttpStatus.OK);
	}
	
}
