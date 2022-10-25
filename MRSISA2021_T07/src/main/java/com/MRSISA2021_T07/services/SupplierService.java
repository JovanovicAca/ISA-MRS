package com.MRSISA2021_T07.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.DisplayOffersDTO;
import com.MRSISA2021_T07.dto.PurchaseOrderDTO;
import com.MRSISA2021_T07.dto.SupplierOffersDTO;
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.PurchaseOrder;
import com.MRSISA2021_T07.model.PurchaseOrderDrug;
import com.MRSISA2021_T07.model.Supplier;
import com.MRSISA2021_T07.model.SupplierPurchaseOrder;
import com.MRSISA2021_T07.repository.AdminRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;
import com.MRSISA2021_T07.repository.PurchaseOrderDrugRepository;
import com.MRSISA2021_T07.repository.PurchaseOrderRepository;
import com.MRSISA2021_T07.repository.SupplierPurchaseOrderRepository;
import com.MRSISA2021_T07.repository.SupplierRepository;

@RestController
@RequestMapping("/supplier")

public class SupplierService {

	@Autowired
	SupplierRepository supply;
	@Autowired
	PurchaseOrderRepository po;
	@Autowired
	SupplierPurchaseOrderRepository spo;
	@Autowired
	PurchaseOrderDrugRepository podr;
	@Autowired
	PharmacyRepository pr;
	@Autowired
	AdminRepository ar;

	@GetMapping(path = "/getSupplier")
	public Supplier getSupplier(@RequestParam String email) {
		Optional<Supplier> sup = Optional.ofNullable(supply.findByEmail(email));
		Supplier d = new Supplier();
		if (!sup.isPresent()) {

			System.out.println("error");
		} else {
			d = sup.get();
		}

		return d;
	}
	
	@GetMapping(path = "/showPharmacyOffers")
	public ArrayList<DisplayOffersDTO> showOffers() { // Mora se dodati broj pored lekova da se naznaci kvantitet
		
		ArrayList<PurchaseOrder> poList = (ArrayList<PurchaseOrder>) getPharmaOffers();
		ArrayList<DisplayOffersDTO> listReturn = new ArrayList<DisplayOffersDTO>();
		
		ArrayList<PurchaseOrderDrug> listDrugs = new ArrayList<PurchaseOrderDrug>();
		//ArrayList<Long> listAdminID = (ArrayList<Long>) po.findAdminID();
		listDrugs = (ArrayList<PurchaseOrderDrug>) getPurchaseDrugs();
		
		for (PurchaseOrder po : poList) {
			fillDrugs(po, listDrugs);
			
		}
		
		
		for (PurchaseOrder purchaseOrder : poList) {
			DisplayOffersDTO dodto = new DisplayOffersDTO();
			String drugNames = "";
			if(purchaseOrder.getStatus().equals("Open")) {
				dodto.setEndTime(purchaseOrder.getEndTime());
				dodto.setId(purchaseOrder.getId());
				//dodto.setPharmacy(returnPharmacyByAdminID(purchaseOrder.getAdmin().getWorks()));
				for (PurchaseOrderDrug purchaseOrderDrug : purchaseOrder.getDrugsP()) {
					drugNames += purchaseOrderDrug.getDrugName() + ", ";
				}
				if(!drugNames.equals("")) {
					drugNames = drugNames.substring(0, drugNames.length() - 2);
				}
				dodto.setDrugs(drugNames);
				listReturn.add(dodto);
			}
		}
		
		return listReturn;
	}

	@PutMapping(path = "/updateSupplier")
	public Supplier updateSupplier(@RequestBody Supplier updatedSupplier) {
		try {
			supply.save(updatedSupplier);
			return updatedSupplier;
		} catch (Exception e) {
			return null;
		}
	}
	
	/////
	@GetMapping(path = "/getPastOffers/{email}")
	public ArrayList<SupplierOffersDTO> getOffers(@PathVariable String email) {
		
		ArrayList<PurchaseOrder> poList = (ArrayList<PurchaseOrder>) getPharmaOffers();
		ArrayList<SupplierPurchaseOrder> spoList = (ArrayList<SupplierPurchaseOrder>) getSupplierOffers();
		
		String drugNames = "";
		ArrayList<SupplierOffersDTO> listReturn = new ArrayList<SupplierOffersDTO>();
		
		ArrayList<PurchaseOrderDrug> listDrugs = new ArrayList<PurchaseOrderDrug>();
		listDrugs = (ArrayList<PurchaseOrderDrug>) getPurchaseDrugs();
		
		for (PurchaseOrder po : poList) {
			fillDrugs(po, listDrugs);
		}
		
		for (SupplierPurchaseOrder supplierPurchaseOrder : spoList) {
			SupplierOffersDTO soDTO = new SupplierOffersDTO();
			drugNames = "";
			if(supplierPurchaseOrder.getEmail().equals(email)) {
				
				long id = supplierPurchaseOrder.getOrderId();
				
				for (PurchaseOrder purchaseOrder : poList) {
					if(purchaseOrder.getId() == id) {
						
						soDTO.setApproved(purchaseOrder.getStatus());
						
						//ArrayList<PurchaseOrderDrug> listDrug = (ArrayList<PurchaseOrderDrug>) purchaseOrder.getDrugs();
						
						//for (PurchaseOrderDrug purchaseOrderDrug : listDrug) { // Napokon vadimo listu lekova da prikazemo
						for (PurchaseOrderDrug purchaseOrderDrug : purchaseOrder.getDrugsP()) {
							drugNames += purchaseOrderDrug.getDrugName() + ", ";
						}
							
							
						//}
						
					}
				}
				if(!drugNames.equals("")) {
					drugNames = drugNames.substring(0, drugNames.length() - 2);
				}
				// Spojili 2 klase u jednu i imamo prikaz da ubacimo u arraylistu
				soDTO.setId(id);
				soDTO.setPrice(supplierPurchaseOrder.getPrice());
				soDTO.setDrugs(drugNames);
				
				listReturn.add(soDTO);
				
			}
		}
		
		return listReturn;
		
	}
	
	
	@GetMapping(path = "/getPharmaOffers")
	public List<PurchaseOrder> getPharmaOffers() {
			
		return po.findAll();
		
	}
	
	@GetMapping(path = "/getSupplierOffers")
	public List<SupplierPurchaseOrder> getSupplierOffers() {
		
		return spo.findAll();
		
	}
	
	@GetMapping(path = "/getPurchaseDrugs")
	public List<PurchaseOrderDrug> getPurchaseDrugs() {
		
		return podr.findAll();
		//return null;
	}
	
	
	@PostMapping(path = "/rememberOffer/{id}")
	public boolean rememberOffer(@PathVariable long id) {
			
		boolean ret = false;
		
		
		
		return ret;
		
	}
	
	
	@GetMapping(path = "/makeOfferPage/{id}")
	public DisplayOffersDTO makeOfferPage(@PathVariable long id) {
		
		ArrayList<PurchaseOrder> listOrder = (ArrayList<PurchaseOrder>) getPharmaOffers();
		
		ArrayList<PurchaseOrderDrug> listDrugs = new ArrayList<PurchaseOrderDrug>();
		listDrugs = (ArrayList<PurchaseOrderDrug>) getPurchaseDrugs();
		
		for (PurchaseOrder po : listOrder) {
			fillDrugs(po, listDrugs);
			
		}
		
		for (PurchaseOrder purchaseOrder : listOrder) {
			if(purchaseOrder.getId() == id) {
				DisplayOffersDTO ret = new DisplayOffersDTO();
				ret.setEndTime(purchaseOrder.getEndTime());
				String drugNames = "";
				for (PurchaseOrderDrug purchaseOrderDrug : purchaseOrder.getDrugsP()) {
					drugNames += purchaseOrderDrug.getDrugName() + ", ";
				}
				if(!drugNames.equals("")) {
					drugNames = drugNames.substring(0, drugNames.length() - 2);
				}
				ret.setDrugs(drugNames);
				return ret;
			}
		}
		
		
		return null;
	}
	
	@PutMapping(path = "/makeOffer") // Ne radi dateTime
	public boolean makeOffer(@RequestBody SupplierPurchaseOrder supplyOffer) {
		
		try {
			supplyOffer = spo.save(supplyOffer);
		}catch(Exception e){
			return false;
		}
		
		return true;
		
	}
	

	public void fillDrugs(PurchaseOrder po, ArrayList<PurchaseOrderDrug> listOrderDrug) {
		
		po.initList();
		
		ArrayList<PurchaseOrderDrug> temp = po.getDrugsP();
		
		for (PurchaseOrderDrug pod : listOrderDrug) {
			
			if(pod.getPurchaseOrder().getId() == po.getId()) { // Punimo set sa lekovima
				
				temp.add(pod);
				
			}
			
		}
		
		po.setDrugsP(temp);
		
	}
	
	/*
	 * public void setAdmin(PurchaseOrder po, long id) {
	 * 
	 * ArrayList<Admin> admins = (ArrayList<Admin>) ar.findAll();
	 * 
	 * for (Admin admin : admins) {
	 * 
	 * if(id == admin.getId()) { po.setAdmin(admin); }
	 * 
	 * } }
	 */
	
	public String returnPharmacyByAdminID(long id) {
		
		ArrayList<Pharmacy> pharmaList = (ArrayList<Pharmacy>) pr.findAll(); 
		
		for (Pharmacy pharmacy : pharmaList) {
			if(pharmacy.getId() == id) {
				return pharmacy.getName();
			}
		}
		return "Error.";
	}
	
}
