package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.model.Appointment;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.Loyalty;
import com.MRSISA2021_T07.model.LoyaltyRule;
import com.MRSISA2021_T07.model.Patient;
import com.MRSISA2021_T07.repository.LoyaltyRepository;
import com.MRSISA2021_T07.repository.LoyaltyRuleRepository;

@RestController
@RequestMapping("/loyal")

public class LoyaltyService { // Pomocna klasa da mi olaksa menjanje loyalty-a
	
	public LoyaltyService() {
		
	}
	
	@Autowired
	private LoyaltyRepository loyal;
	@Autowired
	private LoyaltyRuleRepository loyalRule;
	
	@GetMapping(path="/getRanks")
	public ArrayList<LoyaltyRule> getRanks()
	{	
		ArrayList<LoyaltyRule> listRules = new ArrayList<LoyaltyRule>();
		listRules = (ArrayList<LoyaltyRule>) loyalRule.findAll();
		
		return listRules;
		
	}
	
	@PostMapping(path="/delete/{ID}")
	public boolean delete(@PathVariable long ID)
	{	
		ArrayList<LoyaltyRule> listRules = new ArrayList<LoyaltyRule>();
		listRules = (ArrayList<LoyaltyRule>) loyalRule.findAll();
		
		for (LoyaltyRule loyaltyRule : listRules) {
			
			if(loyaltyRule.getId() == ID) {
				
				loyalRule.deleteById(ID);
				
			}
					
	
		}
		
		return true;
		
	}
	
	public ArrayList<Loyalty> returnLoyaltyList(){
		
		return (ArrayList<Loyalty>) loyal.findAll();
		
	}
	
    
    public ArrayList<LoyaltyRule> returnLoyaltyRule(){ // Vracamo listu svih pravila po na osob
		
		return (ArrayList<LoyaltyRule>) loyalRule.findAll();
		
	}
	
    public ArrayList<LoyaltyRule> sortByPoints(ArrayList<LoyaltyRule> list){

    	Collections.sort(list, new Comparator<LoyaltyRule>() {
    		
    		  @Override
    	      public int compare(final LoyaltyRule object1, final LoyaltyRule object2) {
    	          return object1.getLowPoints() - object2.getLowPoints();
    	      }
    	  });
    	
    	return list;
    	
    }
    
    // !!!
	public void addPoints(Patient patient, Drug drug) {
		
		ArrayList<Loyalty> listaLoyal = new ArrayList<Loyalty>();
		listaLoyal = (ArrayList<Loyalty>) loyal.findAll();
		
		for (Loyalty loyalty : listaLoyal) {
			int currPoints = loyalty.getPoints();
			if(loyalty.getUser().getEmail().equals(patient.getEmail())) {
				
				currPoints += drug.getPoints();
				loyalty.setPoints(currPoints); // Menjamo poene
				
				String newRank = checkRank(loyalty); // Gledamo rank da promenimo
				int newDiscount = updateDiscount(loyalty); // Menjamo buduca snizenja ako je doslo do menjanja ranka
				
				loyalty.setDiscount(newDiscount);
				loyalty.setRank(newRank);
				
				loyal.save(loyalty);
				
			}
		}
		
	}
	
	public void addPointsAppointment(Patient patient, Appointment a) {
		
		ArrayList<Loyalty> listaLoyal = new ArrayList<Loyalty>();
		listaLoyal = (ArrayList<Loyalty>) loyal.findAll();
		
		for (Loyalty loyalty : listaLoyal) {
			int currPoints = loyalty.getPoints();
			if(loyalty.getUser().getEmail().equals(patient.getEmail())) {
				
				currPoints += a.getPrice();
				loyalty.setPoints(currPoints); // Menjamo poene
				
				String newRank = checkRank(loyalty); // Gledamo rank da promenimo
				int newDiscount = updateDiscount(loyalty); // Menjamo buduca snizenja ako je doslo do menjanja ranka
				
				loyalty.setDiscount(newDiscount);
				loyalty.setRank(newRank);
				
				loyal.save(loyalty);
				
			}
		}
		
	}
	
	public String checkRank(Loyalty loyalty) {
		
		ArrayList<LoyaltyRule> listaPravila = new ArrayList<LoyaltyRule>();
		listaPravila = returnLoyaltyRule();
		//listaPravila = sortByPoints(listaPravila);
		
		String rank = "";
		int currentUserPoints = loyalty.getPoints();
		
		for (LoyaltyRule loyaltyRule : listaPravila) {
			
			if(loyaltyRule.getLowPoints() <= currentUserPoints && currentUserPoints < loyaltyRule.getHighPoints()) {
				rank = loyaltyRule.getRank();
			}
			
		}
		
		return rank;
		
	}
	
	public int updateDiscount(Loyalty loyalty) {
		
		ArrayList<LoyaltyRule> listaPravila = new ArrayList<LoyaltyRule>();
		listaPravila = returnLoyaltyRule();
		//listaPravila = sortByPoints(listaPravila);
		
		int discount = 0;
		
		for (LoyaltyRule loyaltyRule : listaPravila) {
			
			if(loyaltyRule.getRank().equals(loyalty.getRank())) {
				discount = loyaltyRule.getDiscount();
			}
			
		}
		
		return discount;
	}
	public double applyDiscountDrug(Patient patient,  double drugPrices) {
		
		double newPrice = 0;
		
		ArrayList<Loyalty> listaLoyal = new ArrayList<Loyalty>();
		listaLoyal = returnLoyaltyList();
		
		for (Loyalty loyalty : listaLoyal) {
			
			if(loyalty.getUser().getEmail().equals(patient.getEmail())) {
				
				newPrice = drugPrices - (drugPrices * loyalty.getDiscount() / 100);
				
			}
			
		}
		
		return newPrice;
	}
	
	public double applyDiscountAppointment(Patient patient,  Appointment appointment, ArrayList<Loyalty> listaLoyal) {
		
		double newPrice = 0;
		
		for (Loyalty loyalty : listaLoyal) {
			
			if(loyalty.getUser().getEmail().equals(patient.getEmail())) {
				
				newPrice = appointment.getPrice() - (appointment.getPrice() * loyalty.getDiscount() / 100);
				
			}
			
		}
		
		return newPrice;
	}

	
}
