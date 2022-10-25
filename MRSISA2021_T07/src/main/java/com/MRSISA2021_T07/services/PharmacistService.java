package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.PharmacistDTO;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Pharmacist;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.repository.PharmacistRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;

@RestController
@RequestMapping("/PHARMA")
public class PharmacistService {
	@Autowired
	private PharmacistRepository pharma;
	
	@Autowired
	private PharmacyRepository pharmacyRepo;

	@GetMapping(path="/getPharmacists")
	public ResponseEntity<List<PharmacistDTO>> getPharmacists()
	{	
		List<PharmacistDTO> listaFarmaceuta = new ArrayList<PharmacistDTO>();
		for (Pharmacist p : pharma.findAll()) 
		{
			listaFarmaceuta.add(PharmacistDTO.transform(p));
		}
		return new ResponseEntity<List<PharmacistDTO>>(listaFarmaceuta,HttpStatus.OK);
	}
	
	@GetMapping(path="/getPharmacistsWork")
	public ResponseEntity<HashMap<Long,String>> getPharmacistsWork()
	{
		List<Pharmacy> listaApoteka = pharmacyRepo.findAll();
		List<Pharmacist> listaApotekara = pharma.findAll();
		
		HashMap<Long, String> mapa = new HashMap<Long, String>();
		
		for (Pharmacist pharmacist : listaApotekara) 
		{
			for (Pharmacy pharmacy : listaApoteka) 
			{
				if(Long.parseLong(pharmacist.getWorksID()) == pharmacy.getId())
				{
					mapa.put(pharmacist.getId(), pharmacy.getName());
				}
			}
		}
		return new ResponseEntity<HashMap<Long,String>>(mapa,HttpStatus.OK);
	}
}
