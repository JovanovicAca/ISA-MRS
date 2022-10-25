package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.HashSet;
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

import com.MRSISA2021_T07.dto.ComplaintDTO;
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Complaint;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.Employment;
import com.MRSISA2021_T07.model.LoyaltyRule;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.Supplier;
import com.MRSISA2021_T07.repository.AdminRepository;
import com.MRSISA2021_T07.repository.ComplaintRepository;
import com.MRSISA2021_T07.repository.DermatologistRepository;
import com.MRSISA2021_T07.repository.DrugRepository;
import com.MRSISA2021_T07.repository.EmploymentRepository;
import com.MRSISA2021_T07.repository.LoginRepository;
import com.MRSISA2021_T07.repository.LoyaltyRuleRepository;
import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;
import com.MRSISA2021_T07.repository.SupplierRepository;


@RestController
@RequestMapping("/admin")

public class AdminService {

	@Autowired
	private LoginRepository loginRepository;
	@Autowired
	private DermatologistRepository derma;
	@Autowired
	private SupplierRepository supply;
	@Autowired
	private AdminRepository admin;
	@Autowired
	private DrugRepository drug;
	@Autowired
	private PharmacyRepository pharma;
	@Autowired
	private PharmacistRepository pharmacist;
	@Autowired
	private EmploymentRepository emprepo;
	@Autowired
	private LoyaltyRuleRepository loyalRule;
	@Autowired
	private EmploymentRepository employ;
	@Autowired
	private ComplaintRepository comp;
	@Autowired
	private EmailService sendEmailService;


	
	@GetMapping(path = "/getpharmacy/{id}")
	public Pharmacy getPharmacy(@PathVariable Long id)
	{
		Optional<Admin> a = admin.findById(id);
		Admin ad;
		ad = a.get();
		try { 
			 
		}
		catch (Exception e) {
			
			return null;
		}
		
		Optional<Pharmacy> pharm = pharma.findById(ad.getWorks());
		Pharmacy p;
		
		if(!pharm.isPresent())
		{
			
			return null;
		}
		else
		{
			p = pharm.get();
			System.out.println(p.getName());
			return p;
		}
	}
	
	@PostMapping(path = "/registerDermatologist/{apotekaID}/{startHours}/{endHours}", consumes="application/json")
	public boolean registerDermatologist(@RequestBody Dermatologist newDermatologist, @PathVariable("apotekaID") Long id
			, @PathVariable("startHours") int startHours, @PathVariable("endHours") int endHours) {
		
		ArrayList<Pharmacy> listaApoteka = new ArrayList<Pharmacy>();
		listaApoteka = (ArrayList<Pharmacy>) pharma.findAll();
		Pharmacy p = new Pharmacy();
		for (Pharmacy pharmacy : listaApoteka) {
			if(pharmacy.getId() == id) {
				p = pharmacy;
			}
		}
		try {
			Optional<PUser> user = Optional.ofNullable(loginRepository.findByEmail(newDermatologist.getEmail()));
			if(!user.isPresent())
			{
				newDermatologist.setFirstLogin(true);
				newDermatologist = derma.save(newDermatologist);
				Employment e = new Employment();
				e.setEmployee(newDermatologist);
				e.setStartHours(startHours);
				e.setEndHours(endHours);
				e.setPharmacy(p);
				
				employ.save(e);
				
				return true;
			}
		} catch (Exception e) {
			return false;
		}
		return false;
	}
	@PostMapping(path = "/registerDermatologist1/", consumes="application/json")
	public ResponseEntity registerDermatologist1(@RequestBody Dermatologist newDermatologist) {
		
		try {
			Optional<PUser> user = Optional.ofNullable(loginRepository.findByEmail(newDermatologist.getEmail()));
			if(!user.isPresent())
			{
				newDermatologist.setFirstLogin(true);
				newDermatologist = derma.save(newDermatologist);
				return new ResponseEntity("Success", HttpStatus.OK);
			}
			else
			{
				Optional<Employment> emp = emprepo.findIfWorks(newDermatologist.getEmail());
				if(emp.isPresent())
				{
					Employment em = emp.get();
					//System.out.println("AAAAAAAAAaa" + em.getEmployee().getRole());
					if(em.getEmployee().getRole().equals("PHARMA"))
					{
						//System.out.println("AAAAAAAAAAAAAAAAAAAAAAA");
						return new ResponseEntity("Email already exist!", HttpStatus.I_AM_A_TEAPOT);
					}
					return new ResponseEntity("Dermatologist already registered", HttpStatus.OK);
				}
				else
				{
					return new ResponseEntity("Error", HttpStatus.I_AM_A_TEAPOT);
				}
					
				
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return new ResponseEntity("Success", HttpStatus.OK);
	}
	
	@PostMapping(path = "/registerSupplier", consumes="application/json")
	public boolean registerSupplier(@RequestBody Supplier newSupplier) {
		//System.out.println(newSupplier.getName());
		try {
			Optional<PUser> user = Optional.ofNullable(loginRepository.findByEmail(newSupplier.getEmail()));
			if(!user.isPresent())
			{
				newSupplier.setFirstLogin(true);
				newSupplier = supply.save(newSupplier);
				return true;
			}
			
		} catch (Exception e) {
			return false;
		}
		return false;
	}
	
	@PostMapping(path = "/registerAdmin", consumes="application/json")
	public boolean registerAdmin(@RequestBody Admin newAdmin) {
		System.out.println(newAdmin.getName());
		if(newAdmin.getAdminType() == "SYSTEM") {
			newAdmin.setWorks(0);
		}
		try {
			Optional<PUser> user = Optional.ofNullable(loginRepository.findByEmail(newAdmin.getEmail()));
			if(!user.isPresent())
			{
				if(newAdmin.getAdminType().equals("EMPTY")) {
					// rad sa errorom prazne opcije
					System.out.println(newAdmin.getAdminType());
					return false;
				}else {
					newAdmin.setFirstLogin(true);
					newAdmin = admin.save(newAdmin);
				}
				return true;
			}
		} catch (Exception e) {
			System.out.println("Zauzet mail");
		}
		return false;
		
	}
	
	@PostMapping(path = "/addDrug/{replacementDrugs}", consumes="application/json")
	public boolean registerDrug(@RequestBody Drug newDrug, @PathVariable("replacementDrugs") String replacementDrugs) { // Ne rade replacement drugs
		try {
			//System.out.println(newDrug.getName());
			ArrayList<Drug> listDrug = new ArrayList<Drug>();
			listDrug = (ArrayList<Drug>) drug.findAll();
			Set<Drug> set = new HashSet<Drug>();
			newDrug.setReplacements(set);
			String tokens[];
			if(replacementDrugs == "No drugs") {
				newDrug.setReplacements(set);
				newDrug = drug.save(newDrug);
				return true;
			}else {
				try { // Vidi sa ekipom lek u lek ne radi
					tokens = replacementDrugs.trim().split(",");
				}catch (Exception e) {
					try {
					
						for (Drug d : listDrug) {
							if(d.getDrugCode().equals(replacementDrugs)) {
								set.add(d);
							}
						}
						newDrug.setReplacements(set);
						newDrug = drug.save(newDrug);
						return true;
					} catch (Exception e2) {
						return false;
					}
				}
				for (String string : tokens) {
					string = string.replaceAll("\\s+","");
					for (Drug d : listDrug) {
						if(d.getDrugCode().equals(string)) {
							set.add(d);
						}
					}
					
				}
				newDrug.setReplacements(set);
				newDrug = drug.save(newDrug);
				return true;
			}

		} catch (Exception e) {
			return false;
		}
		
	}
	
	@PostMapping(path = "/addRank",  consumes="application/json")
	public boolean registerDrug(@RequestBody LoyaltyRule loyaltyRule) {
		try {
			loyalRule.save(loyaltyRule);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	@PostMapping(path = "/registerPharmacy", consumes="application/json")
	public boolean registerDrug(@RequestBody Pharmacy newPharmacy) {
		//System.out.println(newPharmacy.getName());
		try {
			newPharmacy = pharma.save(newPharmacy);
			return true;
		} catch (Exception e) {
			return false;
		}
		
	}
	
	@PostMapping(path = "/registerPharmacist/{apotekaID}/{startHours}/{endHours}", consumes="application/json")
	public boolean registerPharmacist(@RequestBody Pharmacist newPharmacist, @PathVariable("apotekaID") Long id
			, @PathVariable("startHours") int startHours, @PathVariable("endHours") int endHours) {
		//System.out.println(newPharmacist.getName());
		ArrayList<Pharmacy> listaApoteka = new ArrayList<Pharmacy>();
		listaApoteka = (ArrayList<Pharmacy>) pharma.findAll();
		Pharmacy p = new Pharmacy();
		for (Pharmacy pharmacy : listaApoteka) {
			if(pharmacy.getId() == id) {
				p = pharmacy;
			}
		}
		try {
			Optional<PUser> user = Optional.ofNullable(loginRepository.findByEmail(newPharmacist.getEmail()));
			if(!user.isPresent())
			{
				newPharmacist.setFirstLogin(true);
				newPharmacist = pharmacist.save(newPharmacist);
				Employment e = new Employment();
				e.setEmployee(newPharmacist);
				e.setStartHours(startHours);
				e.setEndHours(endHours);
				e.setPharmacy(p);
				
				employ.save(e);
				return true;
			}

		} catch (Exception e) {
			return false;
		}
		return false;
	}
	
	@PostMapping(path = "/registerPharmacist1", consumes="application/json")
	public ResponseEntity registerPharmacist1(@RequestBody Pharmacist newPharmacist) {
		System.out.println(newPharmacist.getName());
		try {
			Optional<PUser> user = Optional.ofNullable(loginRepository.findByEmail(newPharmacist.getEmail()));
			if(!user.isPresent())
			{
				newPharmacist.setFirstLogin(true);
				newPharmacist = pharmacist.save(newPharmacist);
				return new ResponseEntity("Success", HttpStatus.OK);
			}
			else
			{
				Optional<Employment> emp = emprepo.findIfWorks(newPharmacist.getEmail());
				if(emp.isPresent())
				{
					Employment em = emp.get();
					if(em.getEmployee().getRole() == "DERMA")
					{
						return new ResponseEntity("Email already exist!", HttpStatus.I_AM_A_TEAPOT);
					}
					return new ResponseEntity("Pharmacist already registered", HttpStatus.OK);
				}
				else
				{
					return new ResponseEntity("Error", HttpStatus.I_AM_A_TEAPOT);
				}
					
				
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return new ResponseEntity("Success", HttpStatus.OK);
	}
	@PutMapping(path = "/updateAdmin")
	public Admin updateAdmin(@RequestBody Admin a)
	{
		admin.save(a);
		return a;
	}
	
	@GetMapping(path = "/getComplaints")
	public ArrayList<ComplaintDTO> getComplaints()
	{
		ArrayList<ComplaintDTO> listaReturn = new ArrayList<ComplaintDTO>();
		ArrayList<Complaint> listaC = new ArrayList<Complaint>();
		listaC = (ArrayList<Complaint>) comp.findAll();
		
		for (Complaint complaint : listaC) {
			
			ComplaintDTO cdto = new ComplaintDTO();
			cdto.setId(complaint.getId());
			cdto.setComplaint(complaint.getComplaint());
			cdto.setName(complaint.getPatient().getName());
			cdto.setSurname(complaint.getPatient().getSurname());
			listaReturn.add(cdto);
		}
		
		return listaReturn;
		
	}
	
	// 2021-06-15 15:24:53.807  WARN 6392 --- [io-8080-exec-10] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.HttpMediaTypeNotSupportedException: Content type '' not supported]
	//2021-06-15 15:25:59.512  WARN 6392 --- [nio-8080-exec-5] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'GET' not supported]
	@PutMapping(path = "/replyComplaint/{reply}/{complaintID}")
	public void replyComplaint(@PathVariable("reply") String text, @PathVariable("complaintID") Long id)
	{
		
		try {
			Thread t = new Thread() {
				public void run()
				{	
					ArrayList<Complaint> listaC = new ArrayList<Complaint>();
					listaC = (ArrayList<Complaint>) comp.findAll();			
					
					String mail = "";
					
					for (Complaint complaint : listaC) {
						if(complaint.getId() == id) {
							mail = complaint.getPatient().getEmail();
						}
					}
					
					String body = text +
							    "\nIf you have any trouble, write to our support : mrs.tim.sedam@gmail.com";

					String title = "Complaint Reply";
					
					sendEmailService.sendEmail(mail,body,title);		
				}
			};
			t.start();
		} catch (Exception e) {
			
		}
		
			
	}	
		
	
}
