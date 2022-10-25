package com.MRSISA2021_T07.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MRSISA2021_T07.dto.PurchaseOrderDTO;
import com.MRSISA2021_T07.dto.PurchaseOrderDrugDTO;
import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugPharmacy;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.PurchaseOrder;
import com.MRSISA2021_T07.model.PurchaseOrderDrug;
import com.MRSISA2021_T07.model.SupplierPurchaseOrder;
import com.MRSISA2021_T07.repository.AdminRepository;
import com.MRSISA2021_T07.repository.DrugPharmaRepository;
import com.MRSISA2021_T07.repository.DrugRepository;
import com.MRSISA2021_T07.repository.PharmacyRepository;
import com.MRSISA2021_T07.repository.PurchaseOrderDrugRepository;
import com.MRSISA2021_T07.repository.PurchaseOrderRepository;
import com.MRSISA2021_T07.repository.SupplierPurchaseOrderRepository;

@RestController
@RequestMapping("/purchaseOrder")
public class PurchaseOrderService {

	@Autowired
	PurchaseOrderRepository porepo;
	
	@Autowired
	PurchaseOrderDrugRepository podrepo;
	
	@Autowired
	DrugRepository drugrepo;
	
	@Autowired
	AdminRepository admin;
	
	@Autowired
	PharmacyRepository pharma;
	
	@Autowired
	SupplierPurchaseOrderRepository sporepo;

	@Autowired
	DrugPharmaRepository drugpharmarepo;
	
	@Autowired
	private EmailService emailservice;
	
	LocalDate endTime;
	long idAdmin;
	@PostMapping(path = "/makePurchaseOrder/")
	public PurchaseOrder makePurchaseOrder(@RequestBody List<PurchaseOrderDrugDTO> orderedDrugs) {
		Set<PurchaseOrderDrug> pod = new HashSet<PurchaseOrderDrug>();
		PurchaseOrder purchaseOrder = new PurchaseOrder();
		for (PurchaseOrderDrugDTO p : orderedDrugs) {
			//System.out.println("VVVVVVVVVVVVVVVV" + p.toString());
			PurchaseOrderDrug newPOD = new PurchaseOrderDrug();
			newPOD.setDrugId(drugrepo.findDrugIdByCode(p.getDrugCode()));
			
			newPOD.setDrugName(drugrepo.findDrugNameByCode(p.getDrugCode()));
			newPOD.setAmount(p.getAmount());
			newPOD.setPurchaseOrder(purchaseOrder);
			pod.add(newPOD);
		}
		purchaseOrder.setDrugs(pod);
		LocalDateTime time = endTime.atStartOfDay();
		purchaseOrder.setEndTime(time);
		purchaseOrder.setStatus("Open");
		purchaseOrder.setApproved(false);;
		Optional<Admin> a = admin.findById(idAdmin);
		Admin ad;
		if(!a.isPresent())
		{
			return null;
		}
		else {
			ad = a.get();
		}
		Optional<Pharmacy> p = pharma.findById(ad.getWorks());
		Pharmacy ph;
		if(!p.isPresent())
		{
			return null;
		}
		else {
			ph = p.get();
		}
		purchaseOrder.setPharma(ph);
		purchaseOrder.setAdmin(ad);
		porepo.save(purchaseOrder);
		for (PurchaseOrderDrug po : pod) {
			podrepo.save(po);
		}
		
		return purchaseOrder;
		
		
	}
	@PostMapping(path="/saveDateAdmin/{date}/{id}")
	public LocalDate saveDateAdmin(@PathVariable("date") String date,@PathVariable("id") long id)
	{
		idAdmin = id;
		endTime = LocalDate.parse(date);
		return null;
	}
	
	@GetMapping(path="/getAllPurchaseOrders/{id}")
	public Set<PurchaseOrderDTO> getAllPurchaseOrders(@PathVariable long id)
	{
		Optional<Admin> a = admin.findById(id);
		Admin ad;
		if(!a.isPresent())
		{
			return null;
		}
		else {
			ad = a.get();
		}
		Set<PurchaseOrder> purchaseOrders = porepo.findAllByAdmin(ad);
		Set<PurchaseOrderDTO> dtos = new HashSet<PurchaseOrderDTO>();
		for (PurchaseOrder po : purchaseOrders) {
			PurchaseOrderDTO poDTO = new PurchaseOrderDTO(po);
			dtos.add(poDTO);
		}
		return dtos;
	}
	
	@GetMapping(path="/getAllOpenPurchaseOrders/{id}")
	public Set<PurchaseOrderDTO> getAllOpenPurchaseOrders(@PathVariable long id)
	{
		Optional<Admin> a = admin.findById(id);
		Admin ad;
		if(!a.isPresent())
		{
			return null;
		}
		else {
			ad = a.get();
		}
		Set<PurchaseOrder> purchaseOrders = porepo.findAllByAdmin(ad);
		Set<PurchaseOrderDTO> dtos = new HashSet<PurchaseOrderDTO>();
		for (PurchaseOrder po : purchaseOrders) {
			if(po.getStatus().equals("Open")) {
				PurchaseOrderDTO poDTO = new PurchaseOrderDTO(po);
				dtos.add(poDTO);
			}
		}
		return dtos;
	}
	//vraca sve porudzbenice za apoteku
	@GetMapping(path="/allPurchaseOrdersPharmacy/{pharmaId}")
	public Set<SupplierPurchaseOrder> allPurchaseOrdersPharmacy(@PathVariable long pharmaId)
	{
		
		Optional<Pharmacy> p = pharma.findById(pharmaId);
		Pharmacy ph;
		if(!p.isPresent())
		{
			return null;
		}
		else {
			ph = p.get();
		}

		Set<PurchaseOrder> pod = porepo.findAllByPharma(ph.getId());

		List<Long> ids = new ArrayList<Long>();
		for (PurchaseOrder po : pod) {
			ids.add(po.getId());
		}
		
		Set<SupplierPurchaseOrder> spo = new HashSet<SupplierPurchaseOrder>();
		for (Long l : ids) {
			//ovde moze da vrati duplo
			Set<SupplierPurchaseOrder> s = sporepo.findByOrderId(l);
			for (SupplierPurchaseOrder sp : s) {

					Optional<PurchaseOrder> po = porepo.findById(sp.getOrderId());
					
					if(po.get().getStatus().equals("Open"))
					{
						spo.add(sp);
					}	
			}	
		}		
		return spo;
	}
	
	@GetMapping(path="/allPurchaseOrdersForPharmacy/{pharmaId}")
	public Set<PurchaseOrderDTO> allPurchaseOrdersForPharmacy(@PathVariable long pharmaId)
	{
		
		Optional<Pharmacy> p = pharma.findById(pharmaId);
		Pharmacy ph;
		if(!p.isPresent())
		{
			return null;
		}
		else {
			ph = p.get();
		}

		Set<PurchaseOrder> pod = porepo.findAllByPharma(ph.getId());
		Set<PurchaseOrderDTO> podDTO = new HashSet<PurchaseOrderDTO>();
		for (PurchaseOrder purchaseOrder : pod) {
			if(purchaseOrder.getStatus().equals("Open")) {
				PurchaseOrderDTO dto = new PurchaseOrderDTO(purchaseOrder);
				podDTO.add(dto);
			}
			
		}
		return podDTO;
	}
	
	@GetMapping(path="/getAllPurchaseOrdersDrugs/{id}")
	public Set<PurchaseOrderDrugDTO> getAllPurchaseOrdersDrugs(@PathVariable long id){
		Set<PurchaseOrderDrugDTO> dtos = new HashSet<PurchaseOrderDrugDTO>();
		Set<PurchaseOrderDrug> orderDrugs = podrepo.findAllById(id);
		//System.out.println("AAAAAAAAAAAAAAAAAAAAAA" + orderDrugs.size());
		for (PurchaseOrderDrug p : orderDrugs) {
			PurchaseOrderDrugDTO dto = new PurchaseOrderDrugDTO(p);
			dtos.add(dto);
		}
		return dtos;
	}
	
	@DeleteMapping(path="/deleteOrder/{id}/{orderId}")
	public ResponseEntity deleteOrder(@PathVariable long id, @PathVariable long orderId)
	{
		//System.out.println("AAA" + orderId);
		Optional<Admin> a = admin.findById(id);
		Admin ad;
		if(!a.isPresent())
		{
			return null;
		}
		else {
			ad = a.get();
		}
	
		Optional<Pharmacy> p1 = pharma.findById(ad.getWorks());
		Pharmacy ph;
		if(!p1.isPresent())
		{
			return null;
		}
		else {
			ph = p1.get();
		}
		//System.out.println("VVVV");
//		Optional<PurchaseOrder> p = porepo.findByAdminIdAndOrderId(id,orderId);
//		
//		if(!p.isPresent())
//		{
//			System.out.println("GG" );
//			return new ResponseEntity("That order was not made by you!", HttpStatus.I_AM_A_TEAPOT);
//		}
//		else {
//			
//			po = p.get();
//		}
//		
		Set<SupplierPurchaseOrder> sup = sporepo.findByOrderId(orderId);
		//System.out.println("CC");
		if(sup.isEmpty())
		{
			porepo.deleteById(orderId);
			return new ResponseEntity("success!", HttpStatus.OK);
		
		}
		else
		{
			return new ResponseEntity("Purchase order already has offers!", HttpStatus.I_AM_A_TEAPOT);
		}
		
		
	}
	
	@GetMapping(path="/getOffers/{poID}")
	public Set<SupplierPurchaseOrder> getOffers(@PathVariable long poID)
	{
		Set<SupplierPurchaseOrder> sup = sporepo.findByOrderId(poID);
		return sup;
	}
	
	@PutMapping(path="/acceptOffer/{orderId}/{id}/{email}")
	public ResponseEntity acceptOffer(@PathVariable long orderId, @PathVariable long id,@PathVariable String email,@RequestBody List<PurchaseOrderDrugDTO> drugs)
	{
		
		Optional<Admin> a = admin.findById(id);
		Admin ad;
		if(!a.isPresent())
		{
			return null;
		}
		else {
			ad = a.get();
		}
	
		Optional<Pharmacy> p1 = pharma.findById(ad.getWorks());
		Pharmacy ph;
		if(!p1.isPresent())
		{
			return null;
		}
		else {
			ph = p1.get();
		}
		//System.out.println("AAAAAAAAa" + id + " " + orderId);
		Optional<PurchaseOrder> p = porepo.findByAdminIdAndOrderId(id,orderId);
		
		if(!p.isPresent())
		{
			
			return new ResponseEntity("That order was not made by you!", HttpStatus.I_AM_A_TEAPOT);
		}
		else
		{
			System.out.println("CCC" + drugs.size());
			
			//DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			if(now.isBefore(p.get().getEndTime()))
			{
				return new ResponseEntity("Due date is not over!", HttpStatus.I_AM_A_TEAPOT);
			}
			for (PurchaseOrderDrugDTO dto : drugs) {
				Optional<Drug> d = drugrepo.findById(dto.getDrugId());
				DrugPharmacy dp = drugpharmarepo.findByDrugAndPharmacy1(d.get().getId(), ph);
				dp.setAmount(dp.getAmount() + dto.getAmount());
				drugpharmarepo.save(dp);
				
				//promeniti status porudzbine		
				
			}
			
			Optional<PurchaseOrder> po = porepo.findById(orderId);
			PurchaseOrder purchaseOrder = po.get();
			purchaseOrder.setStatus("Closed");
			purchaseOrder.setApproved(true);
			//System.out.println("AAAAAAAAAAAAAAa");
			porepo.save(purchaseOrder); 
			//supplier approved and not approved
			
			Set<SupplierPurchaseOrder> sup = sporepo.findByOrderId(orderId);
			for (SupplierPurchaseOrder s : sup) {
				if(s.getEmail().equals(email)){
					s.setApproved(true);
					sporepo.save(s);
					String body = "\nHi " + s.getEmail() + "\nYour order offer with id: " + orderId + " has been approved!";
					String title = "Order offer " + orderId;
					emailservice.sendEmail(email,body,title);
				}
				else {
					s.setApproved(false);
					String body = "\nHi " + s.getEmail() + "\nYour order offer with id: " + orderId + " has been disapproved!";
					String title = "Order offer " + orderId;
					emailservice.sendEmail(email,body,title);
					sporepo.save(s);
				}
			}
			return new ResponseEntity("success", HttpStatus.OK);
			
			
		}
	}
}

