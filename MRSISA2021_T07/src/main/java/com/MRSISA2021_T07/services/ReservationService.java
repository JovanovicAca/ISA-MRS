package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.Reservation;
import com.MRSISA2021_T07.repository.EmploymentRepository;
import com.MRSISA2021_T07.repository.LoginRepository;
import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.ReservationRepository;

@Service

@RestController
@RequestMapping("/reservation")

public class ReservationService {

	@Autowired
	private ReservationRepository reseRepo;
	@Autowired
	private LoginRepository userRepo;
	@Autowired
	private PharmacistRepository pharmaRepo;
	@Autowired
	private EmploymentRepository empRepo;
	
	@GetMapping(path = "/getReservation/{code}/{id}")
	public ResponseEntity getReservation(@PathVariable long code, @PathVariable long id){
		
		Optional<PUser> po = userRepo.findById(id);
		if(po.isEmpty()) {
			return new ResponseEntity("No such pharmacist!", HttpStatus.OK);
		}
		
		Employment e = empRepo.getEmployment(po.get());
		
		Optional<Reservation> ro = reseRepo.findById(code);
		if(ro.isEmpty()) {
			return new ResponseEntity("No such reservation!", HttpStatus.OK);
		}
		if(ro.get().getPharmacy().getId()!=e.getPharmacy().getId()) {
			return new ResponseEntity("Reservation is not in this pharmacy!", HttpStatus.OK);
		}
		if(ro.get().getIssued()) {
			return new ResponseEntity("Reservation already issued!", HttpStatus.OK);
		}
		Reservation r = ro.get();
		System.out.println(r.getDrugs().size());
		return new ResponseEntity(r, HttpStatus.OK);
	}
	@PostMapping(path = "/issueReservation/{code}")
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public ResponseEntity issueReservation(@PathVariable long code) {
		Reservation r = reseRepo.findOneById(code);
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(r==null) {
			return new ResponseEntity("No such reservation!", HttpStatus.OK);
		}
		if(r.getIssued()) {
			return new ResponseEntity("Reservation already issued!", HttpStatus.OK);
		}
		r.setIssued(true);
		reseRepo.save(r);
		return new ResponseEntity("Reservation successfully issued!", HttpStatus.OK);
	}
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public Reservation findResById(long id) {
		Reservation r = reseRepo.findOneById(id);
		return r;
	}
	
}
