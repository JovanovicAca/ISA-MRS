package com.MRSISA2021_T07.services;

import java.util.HashMap;
import java.util.Optional;
import java.util.Random;

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

import com.MRSISA2021_T07.dto.PharmacyDTO;
import com.MRSISA2021_T07.model.Loyalty;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.repository.LoyaltyRepository;
import com.MRSISA2021_T07.repository.PatientRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;
import com.MRSISA2021_T07.repository.RegistrationRepository;

@RestController
@RequestMapping("/registration")
public class RegistrationService {
	
	private static HashMap<String, String> verification = new HashMap<String, String>();
	private static HashMap<String, Patient> newPatients = new HashMap<String, Patient>();
	
	
	@Autowired
	private RegistrationRepository registrationRepository;
	
	@Autowired
	private PatientRepository patientRepo;
	
	@Autowired
	private EmailService sendEmailService;
	
	@Autowired
	private LoyaltyRepository loyal;
	
	@GetMapping(path= "/isAuthenticated")
	public boolean userAuthenticated(@RequestParam String email)
	{
		PUser user = registrationRepository.findByEmail(email);
		if(user == null)
		{
			return false;
		}
		if(user.getAuthenticated().equalsIgnoreCase("1"))
		{
			return true;
		}
		return false;
	}
	
	
	private String generateVerificationCode()
	{
		Random rand = new Random();
		String verificationCode = "";
		for(int i = 0 ; i < 6 ; i++)
		{
			verificationCode += String.valueOf(rand.nextInt(10));
		}
		return verificationCode;
	}
	
	@PostMapping(path = "/registerUser")
	public boolean registerUser(@RequestBody Patient patient)
	{	
		Optional<PUser> oldUser = Optional.ofNullable(registrationRepository.findByEmail(patient.getEmail())); // Mail -> Korisnik
		if(!oldUser.isPresent()) {
			
			String verificationCode = generateVerificationCode();
			if(!verification.containsKey(patient.getEmail()))
			{
				verification.put(patient.getEmail(), verificationCode);	
			}
			
			String body = "Hello,\nThank you for registering on our website. Below is your verification code.\n" 
							  + "Your Code is: " + verificationCode + 
							    "\nIf you have any trouble, write to our support : mrs.tim.sedam@gmail.com";
			
			String title = "Verification Code";
			
			try 
			{
				Thread t = new Thread() {
					public void run()
					{
						sendEmailService.sendEmail(patient.getEmail(),body,title);		
					}
				};
				t.start();
				
				//Dodajemo mu status neaktivnog i verifikacioni kod
				patient.setAuthenticated("0");
				patient.setVerificationCode(verificationCode);
				Loyalty l = new Loyalty();
				l.setDiscount(0);
				l.setRank("No rank");
				l.setPoints(0);
				l.setUser(patient);
				registrationRepository.save(patient);
				loyal.save(l);
				return true;
			} 
			catch (Exception e) 
			{
				return false;
			}
			
		}
		System.out.println("Korisnik sa ovim mailom postoji ili je nepostojeci mail.");
		return false;
	}
	
	@PostMapping(path = "/emailVerification")
    public boolean verify(@RequestBody String get)
	{	
		String[] tokens = get.split("%3B"); // Ascii ;
		String code = tokens[0];
		String badEmail = tokens[1];
		
		
		String emailParts[] = badEmail.split("%40"); // Ascii @
		String email = emailParts[0] + "@" + emailParts[1].substring(0, emailParts[1].length() - 1);
		
		PUser user = registrationRepository.findByEmail(email);
		if(user != null)
		{
			if(user.getVerificationCode().equalsIgnoreCase(code))
			{
				user.setAuthenticated("1");
				registrationRepository.save(user);
				return true;
			}
		}
		return false;
	}
}
