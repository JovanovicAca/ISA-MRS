package com.MRSISA2021_T07;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.model.eRecipe;
import com.MRSISA2021_T07.repository.DrugRepository;
import com.MRSISA2021_T07.repository.PatientRepository;

public class GenerateERecipe {
	
	@Autowired
	private PatientRepository pat;
	@Autowired
	private DrugRepository dru;
	
	public void generateERecipe() {
		
		ArrayList<Patient> lista = new ArrayList<Patient>();
		lista = (ArrayList<Patient>) pat.findAll();
		ArrayList<Drug> listaD = new ArrayList<Drug>();
		listaD = (ArrayList<Drug>) dru.findAll();
		
		for (Patient patient : lista) {
			eRecipe e1 = new eRecipe();
			e1.setCode("x1");
			e1.setPatient(patient);
			//e1.setDrugs(drugs);
		}
		
		
	}
	
}
