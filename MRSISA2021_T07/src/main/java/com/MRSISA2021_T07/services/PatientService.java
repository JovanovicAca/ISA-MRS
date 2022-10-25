package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

import com.MRSISA2021_T07.dto.DrugDTO;
import com.MRSISA2021_T07.model.Complaint;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.QR;
import com.MRSISA2021_T07.model.Subscribe;
import com.MRSISA2021_T07.repository.ComplaintRepository;
import com.MRSISA2021_T07.repository.DermatologistRepository;
import com.MRSISA2021_T07.repository.PatientRepository;
import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;
import com.MRSISA2021_T07.repository.SubscribeRepository;

@RestController
@RequestMapping("/PATIENT")
public class PatientService {
	@Autowired
	private PatientRepository prepo;
	@Autowired
	private SubscribeRepository sub;
	@Autowired
	private PharmacyRepository pha;
	@Autowired
	private ComplaintRepository cr;
	@Autowired
	private DermatologistRepository derma;
	@Autowired
	private PharmacistRepository pharma;
	
	@PutMapping(path="/addAllergie/{email}", consumes="application/json")
	public boolean addAllergie(@PathVariable("email") String email, @RequestBody Drug drug)
	{
		Patient p = prepo.findByEmail(email);
		p.getAllergies().add(drug);
		prepo.save(p);
		return true;
	}
	
	@PutMapping(path="/removeAllergie/{email}", consumes="application/json")
	public boolean removeAllergie(@PathVariable("email") String email, @RequestBody Drug drug)
	{
		Patient p = prepo.findByEmail(email);
		Set<Drug> listaAlergija = new HashSet<Drug>();
		for (Drug lek : p.getAllergies()) {
			if(!lek.getName().equalsIgnoreCase(drug.getName()))
			{
				listaAlergija.add(lek);
				p.setAllergies(listaAlergija);
				prepo.save(p);
				return true;
			}
		}
		return false;
		
	}
	
	@GetMapping(path="/getMyAllergies/{email}")
	public ResponseEntity<List<DrugDTO>> getMyAllergies(@PathVariable("email") String email)
	{
		Patient p = prepo.findByEmail(email);
		List<DrugDTO> sveAlergije = new ArrayList<DrugDTO>();
		
		for (Drug drug : p.getAllergies()) {
			DrugDTO drugDTO = new DrugDTO(drug);
			sveAlergije.add(drugDTO);
		}
		return new ResponseEntity<List<DrugDTO>>(sveAlergije,HttpStatus.OK);
	}
	
	@GetMapping(path="/getPatients")
	public ResponseEntity<List<Patient>> getPharmacists()
	{	
		return new ResponseEntity<List<Patient>>(prepo.findAll(),HttpStatus.OK);
	}
	
	@PutMapping(path="/updatePatient")
	public void updatePatient(@RequestBody Patient p)
	{
		Patient pacijent = prepo.findByEmail(p.getEmail());
		pacijent.setName(p.getName().split("\\ ")[0]);
		pacijent.setSurname(p.getName().split("\\ ")[1]);
		pacijent.setAddress(p.getAddress());
		pacijent.setCountry(p.getCountry());
		pacijent.setCity(p.getCity());
		prepo.save(pacijent);
	}
	
	@PutMapping(path="/changePassword")
	public void changePassword(@RequestBody Patient p)
	{
		Patient pacijent = prepo.findByEmail(p.getEmail());
		pacijent.setPassword(p.getPassword());
		prepo.save(pacijent);
	}
	
	@PutMapping(path="/subscribe/{id}", consumes="application/json")
	public boolean subscribe(@PathVariable long id, @RequestBody Patient patient) { // Moras dodati proveru da li je vec subovan ovde ili na front
		
		ArrayList<Pharmacy> pharmaList = new ArrayList<Pharmacy>();
		pharmaList = (ArrayList<Pharmacy>) pha.findAll();
		
		Pharmacy p = new Pharmacy();
		
		for (Pharmacy pharmacy : pharmaList) {
			if(pharmacy.getId() == id) {
				p = pharmacy;
			}
		}
		
		Subscribe s = new Subscribe(patient, p);
		
		try {
			sub.save(s);
		} catch (Exception e) {
			return false;
		}
		
		return true;
	}
	
	@GetMapping(path="/getSubs/{email}")
	public ArrayList<Pharmacy> getSubs(@PathVariable String email)
	{	
		ArrayList<Patient> listPatient = new ArrayList<Patient>();
		listPatient = (ArrayList<Patient>) prepo.findAll();
		
		Patient p = new Patient();
		for (Patient patient : listPatient) {
			if(patient.getEmail().equals(email)) {
				p = patient;
			}
		}
		
		ArrayList<Subscribe> subList = new ArrayList<Subscribe>();
		subList = (ArrayList<Subscribe>) sub.findAll();
		
		ArrayList<Pharmacy> ret = new ArrayList<Pharmacy>();
		
		for (Subscribe subscribe : subList) {
			if(subscribe.getPatient().getEmail().equals(p.getEmail())){
				ret.add(subscribe.getPharmacy());
			}
		}
		
		return ret;
		
	}
	
	@PutMapping(path="/writeComplaint/{complaint}/{compUserID}", consumes="application/json")
	public boolean write(@PathVariable("complaint") String complaint, @RequestBody Patient patient, @PathVariable("compUserID") Long id) {
		
		Complaint c = new Complaint();
		
		ArrayList<Pharmacist> listaPH = new ArrayList<Pharmacist>();
		ArrayList<Dermatologist> listaDM = new ArrayList<Dermatologist>();
		listaPH = (ArrayList<Pharmacist>) pharma.findAll();
		listaDM = (ArrayList<Dermatologist>) derma.findAll();
		for (Dermatologist dermatologist : listaDM) {
			if(dermatologist.getId() == id) {
				c.setUser(dermatologist);
			}
		}
		for (Pharmacist pharmacist : listaPH) {
			if(pharmacist.getId() == id) {
				c.setUser(pharmacist);
			}
		}
			
		c.setComplaint(complaint);
		c.setPatient(patient);
	
		try {
			cr.save(c);
		} catch (Exception e) {
			return false;
		}
		
		return true;
	}
	
	@PostMapping(path="/unsubscribe/{email}/{pharmaID}")
	public boolean unsubscribe(@PathVariable String email, @PathVariable long pharmaID)
	{	
		ArrayList<Patient> listPatient = new ArrayList<Patient>();
		listPatient = (ArrayList<Patient>) prepo.findAll();
		
		Patient p = new Patient();
		for (Patient patient : listPatient) {
			if(patient.getEmail().equals(email)) {
				p = patient;
			}
		}
		
		ArrayList<Subscribe> subList = new ArrayList<Subscribe>();
		subList = (ArrayList<Subscribe>) sub.findAll();
		
		
		for (Subscribe subscribe : subList) {
			if(subscribe.getPatient().getEmail().equals(p.getEmail())){
				if(subscribe.getPharmacy().getId() == pharmaID) {
					sub.deleteById(subscribe.getId());
				}
			}
		}
		
		return true;
		
	}
	
	@GetMapping(path="/getEmployeesComplaint")
	public ArrayList<PUser> getEC()
	{	
		ArrayList<PUser> listaZaposlenih = new ArrayList<PUser>();
		ArrayList<Pharmacist> listaPH = new ArrayList<Pharmacist>();
		ArrayList<Dermatologist> listaDM = new ArrayList<Dermatologist>();
		listaPH = (ArrayList<Pharmacist>) pharma.findAll();
		listaDM = (ArrayList<Dermatologist>) derma.findAll();
		for (Dermatologist dermatologist : listaDM) {
			listaZaposlenih.add(dermatologist);
		}
		for (Pharmacist pharmacist : listaPH) {
			listaZaposlenih.add(pharmacist);
		}
		
		return listaZaposlenih;
	}
	
	@PostMapping(path="/uploadQR/{base64String}")
	public boolean uploadQR(@RequestBody Patient p, @PathVariable("base64String") String base64String)
	{	
		QR q = new QR();
		String text = q.readQRCode(base64String);
		
		String tokens[];
		tokens = text.split(";");
		
				
		System.out.println(text);
		
		
		return false;
	}
	
}
