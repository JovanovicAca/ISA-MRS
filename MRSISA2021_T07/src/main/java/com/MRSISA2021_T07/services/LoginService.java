package com.MRSISA2021_T07.services;

import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.PatientDTO;
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Dermatologist;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.repository.LoginRepository;

@RestController
@RequestMapping("/login")
public class LoginService {
	@Autowired
	private LoginRepository loginRepository;
	
	@GetMapping(path = "/{email}/{password}")
	public PUser loginUser(@PathVariable("email") String emailUser, @PathVariable("password") String password)
	{
		boolean bol = false;
		
		Optional<PUser> user = Optional.ofNullable(loginRepository.findByEmail(emailUser));
		PUser pUser;
		if(!user.isPresent())
		{
			return null;
		}
		else
		{
			pUser = user.get();
			
			if(pUser.getPassword().equals(password))
			{
				bol = true;
			}
		}
		if(bol)
		{
			return pUser;
//			if(pUser.getRole().equals("ADMIN"))
//			{
//				Admin a = (Admin) user.get();
//				return PatientDTO.transformAdmin(pUser, a.getWorks());
//			}
//			return PatientDTO.transform(pUser);
		}
			
		else
		{
			return null;
		}
	}
	
	@PutMapping(path="/changePassword/{id}/{password}")	
	public ResponseEntity changePassword(@PathVariable long id, @PathVariable String password) {
		Optional<PUser> po = loginRepository.findById(id);
		PUser p = po.get();
		p.setPassword(password);
		p.setFirstLogin(false);
		loginRepository.save(p);
		return new ResponseEntity("Password changed", HttpStatus.OK);
	}
}


