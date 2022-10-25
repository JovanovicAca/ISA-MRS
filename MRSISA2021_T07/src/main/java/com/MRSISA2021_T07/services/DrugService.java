package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.DrugDTO;
import com.MRSISA2021_T07.dto.DrugPharmacyDTO;
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugPharmacy;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.repository.AdminRepository;
import com.MRSISA2021_T07.repository.DrugPharmaRepository;
import com.MRSISA2021_T07.repository.DrugRepository;
import com.MRSISA2021_T07.repository.PatientRepository;

@RestController
@RequestMapping("/drug")
public class DrugService {

	@Autowired
	private DrugRepository drug;

	@Autowired
	private AdminRepository admin;
	
	@Autowired
	private DrugPharmaRepository drugPharma;
	
	@Autowired
	private PatientRepository patrepo;
	
	@GetMapping(path = "/getAllDrugs")
	public List<DrugDTO> getAllDrugs(){
		List<Drug> drugs = drug.findAll();
		List<DrugDTO> drugsDTO = new ArrayList<DrugDTO>();
		for(Drug d: drugs) {
			DrugDTO dTO = new DrugDTO(d);
			drugsDTO.add(dTO);
		}
		return drugsDTO;

	}

	
	@GetMapping(path="/getAllDrugsTebra")
	public ResponseEntity<List<Drug>> getAllDrugsTebra()
	{
		List<Drug> sviLekovi = drug.findAll();
		List<Drug> noviLekovi = new ArrayList<Drug>();
		for (Drug drug : sviLekovi) {
			Drug novaDroga = new Drug();
			novaDroga.setId(drug.getId());
			novaDroga.setDrugCode(drug.getDrugCode());
			novaDroga.setContradiction(drug.getContradiction());
			novaDroga.setIngredients(drug.getIngredients());
			novaDroga.setInstruction(drug.getInstruction());
			novaDroga.setName(drug.getName());
			novaDroga.setShape(drug.getShape());
			novaDroga.setTakingDose(drug.getTakingDose());
			novaDroga.setTypes(drug.getTypes());
			novaDroga.setRating(drug.getRating());
			noviLekovi.add(novaDroga);
		}
		return new ResponseEntity<List<Drug>>(noviLekovi,HttpStatus.OK);
	}
	

	@GetMapping(path = "/getAllDrugs/{mail}")
	public List<Drug> getAllDrugsPatient(@PathVariable String mail){
		//System.out.println(mail);
		List<Drug> drugs = drug.findAll();
		Patient p = patrepo.findByEmail(mail);
		//System.out.println(p.getEmail());
		//System.out.println(p.getAllergies().size());
		List<Drug> drugsDto = new ArrayList<Drug>();
		List<Long> idjevi= p.getAllergies().stream().map(Drug -> Drug.getId()).collect(Collectors.toList());
		
		
		System.out.println(idjevi.size()+"  alergija");
		for(Drug d : drugs) {
			if(!idjevi.contains(d.getId())) {
				drugsDto.add(d);
			}
		}
		System.out.println(drugsDto.size()+"  naspram "+drugs.size());
		return drugsDto;
	}
	@GetMapping(path = "/getDrugsFromPharmacy/{id}")//id admina
	public List<DrugPharmacyDTO> getDrugs(@PathVariable long id){
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
		Set<DrugPharmacy> drugs = drugPharma.getPharmaDrugs(pharmaID);	
		List<DrugPharmacyDTO> drugsDTO = new ArrayList<DrugPharmacyDTO>();
		for(DrugPharmacy dp : drugs)
		{
			DrugPharmacyDTO dto = new DrugPharmacyDTO(dp);
			drugsDTO.add(dto);
		}
		return drugsDTO;

		
	}
}
