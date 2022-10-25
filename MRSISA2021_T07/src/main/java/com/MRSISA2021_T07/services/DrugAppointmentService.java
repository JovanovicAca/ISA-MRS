package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.DermatologistDTO;
import com.MRSISA2021_T07.dto.DrugAppointmentDTO;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.DrugAppointment;
import com.MRSISA2021_T07.repository.AppointmentRepository;
import com.MRSISA2021_T07.repository.DrugAppointmentRepository;

@RestController
@RequestMapping("/drugAppointment")
public class DrugAppointmentService {

	@Autowired
	private DrugAppointmentRepository drugAppo;
	
	@GetMapping(path="/getMyDrugAppointments/{email}")
	public ResponseEntity<List<DrugAppointmentDTO>> getDrugAppointments(@PathVariable String email)
	{	
		List<DrugAppointmentDTO> drugAppos = new ArrayList<DrugAppointmentDTO>();
		for (DrugAppointment drugAppointment : drugAppo.findAll()) 
		{
			if(drugAppointment.getAppointment().getPatient() == null)
			{
				continue;
			}
			if(drugAppointment.getAppointment().getPatient().getEmail().equalsIgnoreCase(email))
			{
				drugAppos.add(DrugAppointmentDTO.transform(drugAppointment));	
			}
		}
		return new ResponseEntity<List<DrugAppointmentDTO>>(drugAppos,HttpStatus.OK);
	}
	
}
