package com.MRSISA2021_T07.services;


import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.DrugPharmacyDTO;
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugPharmacy;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.Reservation;
import com.MRSISA2021_T07.model.Subscribe;
import com.MRSISA2021_T07.repository.AdminRepository;
import com.MRSISA2021_T07.repository.DrugPharmaRepository;
import com.MRSISA2021_T07.repository.DrugRepository;
import com.MRSISA2021_T07.repository.DrugReservationRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;
import com.MRSISA2021_T07.repository.ReservationRepository;
import com.MRSISA2021_T07.repository.SubscribeRepository;

@RestController
@RequestMapping("/drugPharma")
public class DrugPharmacyService {
	
	@Autowired
	DrugPharmaRepository drugPharma;
	
	@Autowired
	DrugRepository drug;
	
	@Autowired
	AdminRepository admin;
	
	@Autowired
	PharmacyRepository pharma;
	
	@Autowired
	SubscribeRepository sub;
	
	@Autowired
	private EmailService emailservice;
	
	@Autowired
	ReservationRepository reserrepo;
	
	@Autowired
	DrugReservationRepository drugresrepo;
	
	private List<String> drugCodes;
	private HashMap<String, Double> mapa = new HashMap<String, Double>();
	
	@PutMapping(path= "/updateDrugQuantity", consumes="application/json")
	public void updateDrugQuantity(@RequestBody DrugPharmacyDTO dto)
	{
		for (DrugPharmacy dp : drugPharma.findAll()) {
			if(dp.getPharmacy().getId() == dto.getPharmacyID() && dp.getDrug().getId() == dto.getDrugID())
			{
				dp.setAmount(dto.getAmount());
				drugPharma.save(dp);
				return;
			}
		}
	}
	
	@GetMapping(path = "/getPharmaDrugsTebra")
	public ResponseEntity<List<DrugPharmacyDTO>> getAllPharmacies()
	{
		List<DrugPharmacy> postojece = drugPharma.findAll();
		List<DrugPharmacyDTO> novi = new ArrayList<DrugPharmacyDTO>();
		
		for (DrugPharmacy drugPharmacy : postojece) {
			if(drugPharmacy.getAmount() > 0)
			{
				LocalDate lt = LocalDate.now();
				if(drugPharmacy.getStartActionPrice() == null || drugPharmacy.getEndActionPrice() == null)
				{
					novi.add(DrugPharmacyDTO.transform(drugPharmacy));
					continue;
				}
				if(lt.isAfter(drugPharmacy.getStartActionPrice()) && lt.isBefore(drugPharmacy.getEndActionPrice()))
				{
					drugPharmacy.setPrice(drugPharmacy.getActionPrice());
				}
				novi.add(DrugPharmacyDTO.transform(drugPharmacy));
			}
		}
		return new ResponseEntity<List<DrugPharmacyDTO>>(novi,HttpStatus.OK);
	}
	
	@PostMapping(path = "/addNewDrugPharmacy/{id}/{code}//")
	public Drug addNewDrugPharmacy(@PathVariable("id") long id,@PathVariable("code") String code) {
		Optional<Admin> a = admin.findById(id);
		Admin ad;
		if(!a.isPresent())
		{
			return null;
		}
		else {
			ad = a.get();
		}
		
		long pharmaID = ad.getWorks();
		Optional<Pharmacy> p = pharma.findById(pharmaID);
		Pharmacy ph;
		if(!p.isPresent())
		{
			return null;
		}
		else {
			ph = p.get();
		}
		DrugPharmacy newDrug = new DrugPharmacy();
		Drug d = drug.findByCode(code);
		Optional<DrugPharmacy> dp = drugPharma.findBydrug(code,ph.getId());
		
		if(!dp.isPresent())
		{
			newDrug.setDrug(d);
			newDrug.setAmount(0);
			//newDrug.setPrice(price);
			newDrug.setPharma(ph);
			newDrug = drugPharma.save(newDrug);
			Drug dr = newDrug.getDrug();
			dr.setReplacements(null);
			return dr;
		}
		else
		{
			if(dp.get().getPharma().getId() == ph.getId())
			{
				newDrug = dp.get();
				newDrug.setAmount(newDrug.getAmount());
				//newDrug.setPrice(price);
				//newDrug.setPharma(ph);
				drugPharma.save(newDrug);
				Drug dr = newDrug.getDrug();
				dr.setReplacements(null);
				return dr;
			}
			else
			{
				
				//newDrug = dp.get();
				DrugPharmacy nd = new DrugPharmacy();
				nd.setAmount(dp.get().getAmount());
				//nd.setPrice(price);
				nd.setPharma(ph);
				nd.setDrug(dp.get().getDrug());
				drugPharma.save(nd);
				Drug dr = nd.getDrug();
				dr.setReplacements(null);
				return dr;
			}
			
		}
		
	}
	
	@DeleteMapping(path = "/deleteDrug/{code}/{id}")
	public ResponseEntity deleteDrug(@PathVariable("code") String code,@PathVariable("id") long id)
	{
		Optional<Admin> a = admin.findById(id);
		Admin ad;
		if(!a.isPresent())
		{
			return null;
		}
		else {
			ad = a.get();
		}
		
		long pharmaID = ad.getWorks();
		Optional<Pharmacy> p = pharma.findById(pharmaID);
		Pharmacy ph;
		if(!p.isPresent())
		{
			return null;
		}
		else {
			ph = p.get();
		}
		
		
		Drug d = drug.findByCode(code);
		//Optional<DrugReservation> dr = drugresrepo.findByDrug(d.getId());
		long dpid = drugPharma.findByDrug(d.getDrugCode(),ph.getId());
		//DrugPharmacy dp = dpid.get();
		Optional<Reservation> reser = reserrepo.findByDrug(d);
		if(reser.isPresent())
		{
			Reservation r = reser.get();
			if(!r.getIssued())
			{
				return new ResponseEntity("Drug reserved and not issued!", HttpStatus.I_AM_A_TEAPOT);
			}
		}
		

		drugPharma.deleteById(dpid);
		return new ResponseEntity("Drug deleted!", HttpStatus.OK);
		
	}
	
	@PutMapping(path = "/makePrice/{id}/{code}", consumes="application/json")
	public DrugPharmacy makePrice(@PathVariable("id") long id,@PathVariable("code") String code, @RequestBody DrugPharmacy dp) {
		Optional<Admin> a = admin.findById(id);
		Admin ad;
		if(!a.isPresent())
		{
			return null;
		}
		else {
			ad = a.get();
		}
		
		long pharmaID = ad.getWorks();
		
		Optional<Pharmacy> p = pharma.findById(pharmaID);
		Pharmacy ph;
		if(!p.isPresent())
		{
			return null;
		}
		else {
			ph = p.get();
		}
		Drug d = drug.findByCode(code);
		long dpid = drugPharma.findByDrug(d.getDrugCode(),ph.getId());
		Optional<DrugPharmacy> drugp = drugPharma.findById(dpid);
		DrugPharmacy dr;
		if(!drugp.isPresent())
		{
			return null;
		}
		else
		{
			dr = drugp.get();
		}
		dr.setPrice(dp.getPrice());
		dr.setStartPrice(dp.getStartPrice());
		dr.setEndPrice(dp.getEndPrice());
		drugPharma.save(dr);
		return dp;
	}
	
	@PutMapping(path = "/makePromotePrice/{id}/{codes}", consumes="application/json")
	public DrugPharmacy makePromotePrice(@PathVariable("id") long id,@PathVariable("codes") List<String> codes, @RequestBody DrugPharmacy dp) {
		//System.out.println("AAAAAAAAAAa" + dp.getActionPrice());
		//drugCodes.add(code);
		Optional<Admin> a = admin.findById(id);
		Admin ad;
		if(!a.isPresent())
		{
			return null;
		}
		else {
			ad = a.get();
		}
		
		long pharmaID = ad.getWorks();
		
		Optional<Pharmacy> p = pharma.findById(pharmaID);
		Pharmacy ph;
		if(!p.isPresent())
		{
			return null;
		}
		else {
			ph = p.get();
		}
		DrugPharmacy dr = null;
		String body = "\nActive promotion" + "\n";
	
		for(Map.Entry mapElement : mapa.entrySet())
		{
			//System.out.println("VVV" +iterator.next().toString() );
			Drug d = drug.findByCode((String)mapElement.getKey());
			long dpid = drugPharma.findByDrug(d.getDrugCode(),ph.getId());
			Optional<DrugPharmacy> drugp = drugPharma.findById(dpid);
			
			if(!drugp.isPresent())
			{
				return null;
			}
			else
			{
				dr = drugp.get();
			}
			dr.setActionPrice((double)mapElement.getValue());
			dr.setStartActionPrice(dp.getStartActionPrice());
			dr.setEndActionPrice(dp.getEndActionPrice());
			drugPharma.save(dr);
			//System.out.println("AAA" + dr.getActionPrice() + dp.getActionPrice());
			//Drug d = drug.findByCode(code);	
			body += "\nDrug: " + d.getName() + " is on promotion.\n" + "Promo price is: " +  (double)mapElement.getValue()+ "!\n" ; 
		}
		
		
		body +=  "\nDate of promotion start is " + dr.getStartActionPrice() + "\nDate of promotion end is " + dr.getEndActionPrice();
		
		sendPromoEmail(ph,body);
		return dp;
	}
	
	@GetMapping(path="/saveCodePrice/{code}/{actionPrice}")
	public ResponseEntity saveCodePrice(@PathVariable String code,@PathVariable double actionPrice)
	{
		//System.out.println("AAA" + code + actionPrice);
		mapa.put(code, actionPrice);
	
		return new ResponseEntity("Success!", HttpStatus.OK);
	}
	@PutMapping(path = "/changeQuantity/{code}/{id}/{quantity}")
	public ResponseEntity changeQuantity(@PathVariable("code") String code,@PathVariable("id") long id,@PathVariable("quantity") int quantity)
	{
	
		
		Optional<DrugPharmacy> dp = drugPharma.findBydrug(code, id);
		DrugPharmacy drugPharmacy;
		if(dp.isPresent()) {
			drugPharmacy = dp.get();
		}
		else {
			return new ResponseEntity("Error!", HttpStatus.I_AM_A_TEAPOT);
		}
		
		drugPharmacy.setAmount(quantity);
		drugPharma.save(drugPharmacy);
		return new ResponseEntity("Quantity changed!", HttpStatus.OK);
		
	}
	private void sendPromoEmail(Pharmacy ph,String body) {
		Set<Subscribe> subscribedPatients = sub.getAllSubedPharma(ph);
		for (Subscribe s : subscribedPatients) {
			String title = "Promotion for drugs!";
			String email = s.getPatient().getEmail();
			emailservice.sendEmail(email,body,title);
		}
		
	}
}
