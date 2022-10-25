package com.MRSISA2021_T07.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

import com.MRSISA2021_T07.dto.DermatologistDTO;
import com.MRSISA2021_T07.dto.DermatologistRateDTO;
import com.MRSISA2021_T07.dto.DrugRateDTO;
import com.MRSISA2021_T07.dto.PharmacistDTO;
import com.MRSISA2021_T07.dto.PharmacistRateDTO;
import com.MRSISA2021_T07.dto.PharmacyRateDTO;
import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugOrderPatient;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.RatingDermatologist;
import com.MRSISA2021_T07.model.RatingDrug;
import com.MRSISA2021_T07.model.RatingPharmacist;
import com.MRSISA2021_T07.model.RatingPharmacy;
import com.MRSISA2021_T07.repository.AppointmentRepository;
import com.MRSISA2021_T07.repository.DermatologistRepository;
import com.MRSISA2021_T07.repository.DrugOrderPatientRepository;
import com.MRSISA2021_T07.repository.DrugRepository;
import com.MRSISA2021_T07.repository.PatientRepository;
import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;
import com.MRSISA2021_T07.repository.RatingDermatologistRepository;
import com.MRSISA2021_T07.repository.RatingDrugRepository;
import com.MRSISA2021_T07.repository.RatingPharmacistRepository;
import com.MRSISA2021_T07.repository.RatingPharmacyRepository;

@RestController
@RequestMapping("/rate")
public class RatingService {

	@Autowired
	AppointmentRepository appointmentRepo;
	@Autowired
	DrugRepository drugRepo;
	@Autowired
	PharmacyRepository pharmaRepo;
	@Autowired
	PharmacistRepository pharmacistRepo;
	@Autowired
	DermatologistRepository dermaRepo;
	@Autowired
	DrugOrderPatientRepository orderRepo;
	@Autowired
	PatientRepository patientRepo;
	@Autowired
	RatingDrugRepository rateDrugRepo;
	@Autowired
	RatingPharmacistRepository ratePharmacistRepo;
	@Autowired
	RatingPharmacyRepository ratePharmacyRepo;
	@Autowired
	RatingDermatologistRepository rateDermaRepo;
	
	@PutMapping(path="/changeRating/{email}")
	public boolean changeRating(@PathVariable String email, @RequestBody DrugRateDTO dto)
	{
		for(RatingDrug drugRate : rateDrugRepo.findAll())
		{
			if(drugRate.getPatient().getEmail().equalsIgnoreCase(email) && drugRate.getDrug().getId() == dto.getDrugID())
			{
				drugRate.setRatingDate(LocalDate.now());
				drugRate.setRating(dto.getMyRating());
				rateDrugRepo.save(drugRate);
				formDrugRating();
				return true;
			}
		}
		return false;
	}
	
	@PutMapping(path="/changePharmacyRating/{email}")
	public boolean changePharmacyRating(@PathVariable String email, @RequestBody PharmacyRateDTO dto)
	{
		for(RatingPharmacy pharmacyRate : ratePharmacyRepo.findAll())
		{
			if(pharmacyRate.getPatient().getEmail().equalsIgnoreCase(email) && pharmacyRate.getPharmacy().getId() == dto.getPharmacyID())
			{
				pharmacyRate.setRatingDate(LocalDate.now());
				pharmacyRate.setRating(dto.getMyRating());
				ratePharmacyRepo.save(pharmacyRate);
				formPharmacyRating();
				return true;
			}
		}
		return false;
	}
	
	@PostMapping(path="/rateDrug/{email}")
	public boolean rateDrug(@PathVariable String email, @RequestBody DrugRateDTO dto)
	{
		RatingDrug rate = new RatingDrug();
		rate.setDrug(drugRepo.findById(dto.getDrugID()).get());
		rate.setPatient(patientRepo.findByEmail(email));
		rate.setRating(dto.getMyRating());
		rate.setRatingDate(LocalDate.now());
		rateDrugRepo.save(rate);
		formDrugRating();
		return true;
	}
	
	@PostMapping(path="/ratePharmacy/{email}")
	public boolean ratePharmacy(@PathVariable String email, @RequestBody PharmacyRateDTO dto)
	{
		RatingPharmacy rate = new RatingPharmacy();
		rate.setPharmacy(pharmaRepo.findById(dto.getPharmacyID()).get());
		rate.setPatient(patientRepo.findByEmail(email));
		rate.setRating(dto.getMyRating());
		rate.setRatingDate(LocalDate.now());
		ratePharmacyRepo.save(rate);
		formPharmacyRating();
		return true;
	}
	
	@GetMapping(path="/getMyRatedDrugs/{email}")
	public ResponseEntity<List<DrugRateDTO>> getMyRatedDrugs(@PathVariable String email)
	{
		List<DrugRateDTO> dto = new ArrayList<DrugRateDTO>();
		for(RatingDrug drugRate : rateDrugRepo.findAll())
		{
			if(drugRate.getPatient().getEmail().equalsIgnoreCase(email))
			{
				dto.add(DrugRateDTO.transform(drugRate));
			}
		}
		return new ResponseEntity<List<DrugRateDTO>>(dto,HttpStatus.OK);
	}
	
	@GetMapping(path="/getUnratedDrugs/{email}")
	public ResponseEntity<List<DrugRateDTO>> getUnratedDrugs(@PathVariable String email)
	{
		List<DrugRateDTO> dto = new ArrayList<DrugRateDTO>();
		
		List<Drug> ratedDrugs = new ArrayList<Drug>();
		for(RatingDrug drugRate : rateDrugRepo.findAll())
		{
			if(drugRate.getPatient().getEmail().equalsIgnoreCase(email))
			{
				ratedDrugs.add(drugRate.getDrug());
			}
		}
		
		for(DrugOrderPatient order : orderRepo.findAll())
		{
			boolean found = false;
			for(Drug drug : ratedDrugs)
			{
				if(order.getDrug().getId() != drug.getId() && !order.isCanceled() && order.isRecived())
				{
					found = true;
				}
				else
				{
					found = false;
					break;
				}
			}
			if(found)
			{
				dto.add(DrugRateDTO.transformOrder(order));
			}
		}
		return new ResponseEntity<List<DrugRateDTO>>(dto,HttpStatus.OK);
	}
	
	@GetMapping(path="/formDrugRating")
	public void formDrugRating()
	{
		for(Drug drug : drugRepo.findAll())
		{
			int counter = 0;
			int sum = 0;
			for (RatingDrug drugRate : rateDrugRepo.findAll()) 
			{
				if(drugRate.getDrug().getId() == drug.getId())
				{
					counter ++;
					sum += drugRate.getRating();
				}
			}
			if(counter != 0)
			{
				float rating = (float)sum/counter;
				drug.setRating(rating);
				drugRepo.save(drug);
			}
		}
	}
	
	@GetMapping(path="/formPharmacyRating")
	public void formPharmacyRating()
	{
		for(Pharmacy pharmacy : pharmaRepo.findAll())
		{
			int counter = 0;
			int sum = 0;
			for(RatingPharmacy pharmacyRate : ratePharmacyRepo.findAll())
			{
				if(pharmacyRate.getPharmacy().getId() == pharmacy.getId())
				{
					counter ++;
					sum += pharmacyRate.getRating();
				}
			}
			if(counter != 0)
			{
				float rating = (float)sum/counter;
				pharmacy.setRating(rating);
				pharmaRepo.save(pharmacy);
			}
		}
	}
	
	@GetMapping(path="/getMyRatedPharmacies/{email}")
	public ResponseEntity<List<PharmacyRateDTO>> getMyRatedPharmacies(@PathVariable String email)
	{
		List<PharmacyRateDTO> ocenjeneApoteke = new ArrayList<PharmacyRateDTO>();
		for(RatingPharmacy pharmaRate : ratePharmacyRepo.findAll())
		{
			if(pharmaRate.getPatient().getEmail().equalsIgnoreCase(email))
			{
				ocenjeneApoteke.add(PharmacyRateDTO.transform(pharmaRate));
			}
		}
		return new ResponseEntity<List<PharmacyRateDTO>>(ocenjeneApoteke,HttpStatus.OK);
		
	}
	
	@GetMapping(path="/getUnratedPharmacies/{email}")
	public ResponseEntity<List<PharmacyRateDTO>> getUnratedPharmacies(@PathVariable String email)
	{
		List<Pharmacy> sveApoteke = new ArrayList<Pharmacy>();
		List<Pharmacy> ocenjeneApoteke = new ArrayList<Pharmacy>();
		for(RatingPharmacy pharmaRate : ratePharmacyRepo.findAll())
		{
			if(pharmaRate.getPatient().getEmail().equalsIgnoreCase(email))
			{
				ocenjeneApoteke.add(pharmaRate.getPharmacy());
			}
		}
		List<PharmacyRateDTO> dtoApoteke = new ArrayList<PharmacyRateDTO>();
		for(DrugOrderPatient order : orderRepo.findAll())
		{
			if(order.getPatient().getEmail().equalsIgnoreCase(email) && !order.isCanceled() && order.isRecived())
			{
				if(!sveApoteke.contains(order.getPharmacy()))
				{
					sveApoteke.add(order.getPharmacy());
				}
			}
		}
		for(Appointment appointment : appointmentRepo.findAll())
		{
			try
			{
				if(appointment.getPatient().getEmail().equalsIgnoreCase(email) && appointment.getAppeared())
				{
					if(!sveApoteke.contains(appointment.getPharmacy()))
					{
						sveApoteke.add(appointment.getPharmacy());
					}
				}
			}
			catch (Exception e) {}
		}
		for(Pharmacy p1 : sveApoteke)
		{
			boolean found = false;
			for(Pharmacy p2 : ocenjeneApoteke)
			{
				if(p1.getId() != p2.getId())
				{
					found = true;
				}
				else
				{
					found = false;
					break;
				}
			}
			if(found)
			{
				dtoApoteke.add(PharmacyRateDTO.transform(p1));
			}
		}
		return new ResponseEntity<List<PharmacyRateDTO>>(dtoApoteke,HttpStatus.OK);
	}
	
	@GetMapping(path="/formPharmacistRating")
	public void formPharmacistRating()
	{
		for(Pharmacist pharmacist : pharmacistRepo.findAll())
		{
			int counter = 0;
			int sum = 0;
			for(RatingPharmacist pharmacistRate : ratePharmacistRepo.findAll())
			{
				if(pharmacistRate.getPharmacist().getId() == pharmacist.getId())
				{
					counter++;
					sum += pharmacistRate.getRating();
				}
			}
			if(counter != 0)
			{
				float rating = (float)sum/counter;
				pharmacist.setRating(rating);
				pharmacistRepo.save(pharmacist);
			}
		}
	}
	
	@GetMapping(path="/getMyRatedPharmacists/{email}")
	public ResponseEntity<List<PharmacistRateDTO>> getMyRatedPharmacists(@PathVariable String email)
	{
		List<PharmacistRateDTO> dto = new ArrayList<PharmacistRateDTO>();
		for(RatingPharmacist pharmacistRate : ratePharmacistRepo.findAll())
		{
			if(pharmacistRate.getPatient().getEmail().equalsIgnoreCase(email))
			{
				dto.add(PharmacistRateDTO.transformRate(pharmacistRate));
			}
		}
		return new ResponseEntity<List<PharmacistRateDTO>>(dto,HttpStatus.OK);
	}
	
	@GetMapping(path="/getUnratedPharmacists/{email}")
	public ResponseEntity<List<PharmacistRateDTO>> getUnratedPharmacists(@PathVariable String email)
	{
		List<PharmacistRateDTO> dto = new ArrayList<PharmacistRateDTO>();
		
		List<Pharmacist> ratedPharmacists = new ArrayList<Pharmacist>();
		for(RatingPharmacist pharmacistRate : ratePharmacistRepo.findAll())
		{
			if(pharmacistRate.getPatient().getEmail().equalsIgnoreCase(email))
			{
				ratedPharmacists.add(pharmacistRate.getPharmacist());
			}
		}
		for(Appointment appointment: appointmentRepo.findAll())
		{
			for(Pharmacist pharmacist : ratedPharmacists)
			{
				if(appointment.getDoctor().getEmail().equalsIgnoreCase(pharmacist.getEmail()))
				{
					break;
				}
				if(appointment.getDoctor().getRole().equalsIgnoreCase("PHARMA") && appointment.getPatient().getEmail().equalsIgnoreCase(email))
				{
					if(appointment.getEndTime().isBefore(LocalDateTime.now()))
					{
						if(!dto.contains(PharmacistRateDTO.transformAppo(appointment)))
						{
							PharmacistRateDTO newDTO = new PharmacistRateDTO();
							newDTO = newDTO.transformAppo(appointment);
							Pharmacist ph = pharmacistRepo.findByEmail(appointment.getDoctor().getEmail());
							newDTO.setRating(ph.getRating());
							dto.add(newDTO);
						}
					}
				}
			}
		}
		dto.remove(dto.size()-1);
		return new ResponseEntity<List<PharmacistRateDTO>>(dto,HttpStatus.OK);
	}
	
	@GetMapping(path="/formDermatologistRating")
	public void formDermatologistRating()
	{
		for(Dermatologist dermatologist : dermaRepo.findAll())
		{
			int counter = 0;
			int sum = 0;
			for(RatingDermatologist dermaRate : rateDermaRepo.findAll())
			{
				if(dermaRate.getDermatologist().getId() == dermatologist.getId())
				{
					counter++;
					sum += dermaRate.getRating();
				}
			}
			if(counter != 0)
			{
				float rating = (float)sum/counter;
				dermatologist.setRating(rating);
				dermaRepo.save(dermatologist);
			}
		}
	}
	
	@GetMapping(path="/getUnratedDermatologists/{email}")
	public ResponseEntity<List<DermatologistRateDTO>> getUnratedDermatologists(@PathVariable String email)
	{
		List<DermatologistRateDTO> dto = new ArrayList<DermatologistRateDTO>();
		
		List<Dermatologist> ratedDermatologists = new ArrayList<Dermatologist>();
		for(RatingDermatologist dermaRate: rateDermaRepo.findAll())
		{
			if(dermaRate.getPatient().getEmail().equalsIgnoreCase(email))
			{
				ratedDermatologists.add(dermaRate.getDermatologist());
			}
		}
		for(Appointment appointment: appointmentRepo.findAll())
		{
			for(Dermatologist dermatologist: ratedDermatologists)
			{
				if(appointment.getDoctor().getEmail().equalsIgnoreCase(dermatologist.getEmail()))
				{
					break;
				}
				if(appointment.getPatient() == null)
				{
					break;
				}
				if(appointment.getDoctor().getRole().equalsIgnoreCase("DERMA") && appointment.getPatient().getEmail().equalsIgnoreCase(email))
				{
					if(appointment.getEndTime().isBefore(LocalDateTime.now()))
					{	
						if(!dto.contains(DermatologistRateDTO.transformAppo(appointment)))
						{
							DermatologistRateDTO newDTO = new DermatologistRateDTO();
							newDTO = newDTO.transformAppo(appointment);
							Dermatologist ph = dermaRepo.findByEmail(appointment.getDoctor().getEmail());
							newDTO.setRating(ph.getRating());
							dto.add(newDTO);
						}
					}
				}
			}
		}
		dto.remove(dto.size()-1);
		return new ResponseEntity<List<DermatologistRateDTO>>(dto,HttpStatus.OK);
	}
	
	@GetMapping(path="/getMyRatedDermatologists/{email}")
	public ResponseEntity<List<DermatologistRateDTO>> getMyRatedDermatologists(@PathVariable String email)
	{
		List<DermatologistRateDTO> dto = new ArrayList<DermatologistRateDTO>();
		for(RatingDermatologist dermaRate: rateDermaRepo.findAll())
		{
			if(dermaRate.getPatient().getEmail().equalsIgnoreCase(email))
			{
				dto.add(DermatologistRateDTO.transformRate(dermaRate));
			}
		}
		return new ResponseEntity<List<DermatologistRateDTO>>(dto,HttpStatus.OK);
	}
	
	@PostMapping(path="/rateDermatologist/{email}")
	public boolean rateDermatologist(@PathVariable String email, @RequestBody DermatologistRateDTO dto)
	{
		RatingDermatologist rate = new RatingDermatologist();
		rate.setDermatologist(dermaRepo.findByEmail(dto.getDermatologistEmail()));
		rate.setPatient(patientRepo.findByEmail(email));
		rate.setRating(dto.getMyRating());
		rate.setRatingDate(LocalDate.now());
		rateDermaRepo.save(rate);
		formDermatologistRating();
		return true;
	}
	
	@PutMapping(path="/changeDermaRating/{email}")
	public boolean changeDermaRating(@PathVariable String email, @RequestBody DermatologistRateDTO dto)
	{
		for(RatingDermatologist dermaRate : rateDermaRepo.findAll())
		{
			if(dermaRate.getPatient().getEmail().equalsIgnoreCase(email) && dermaRate.getDermatologist().getEmail().equalsIgnoreCase(dto.getDermatologistEmail()))
			{
				dermaRate.setRating(dto.getMyRating());
				dermaRate.setRatingDate(LocalDate.now());
				rateDermaRepo.save(dermaRate);
				formDermatologistRating();
				return true;
			}
		}
		return false;
	}
	
	@PutMapping(path="/changePharmaRating/{email}")
	public boolean changePharmaRating(@PathVariable String email, @RequestBody PharmacistRateDTO dto)
	{
		for(RatingPharmacist dermaRate : ratePharmacistRepo.findAll())
		{
			if(dermaRate.getPatient().getEmail().equalsIgnoreCase(email) && dermaRate.getPharmacist().getEmail().equalsIgnoreCase(dto.getPharmacistEmail()))
			{
				dermaRate.setRating(dto.getMyRating());
				dermaRate.setRatingDate(LocalDate.now());
				ratePharmacistRepo.save(dermaRate);
				formPharmacistRating();
				return true;
			}
		}
		return false;
	}
	
	@PostMapping(path="/ratePharmacist/{email}")
	public boolean ratePharmacist(@PathVariable String email, @RequestBody PharmacistRateDTO dto)
	{
		RatingPharmacist rate = new RatingPharmacist();
		rate.setPharmacist(pharmacistRepo.findByEmail(dto.getPharmacistEmail()));
		rate.setPatient(patientRepo.findByEmail(email));
		rate.setRating(dto.getMyRating());
		rate.setRatingDate(LocalDate.now());
		ratePharmacistRepo.save(rate);
		formPharmacistRating();
		return true;
	}
}
