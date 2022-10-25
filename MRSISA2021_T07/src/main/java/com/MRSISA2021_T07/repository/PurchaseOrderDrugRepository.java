package com.MRSISA2021_T07.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.PurchaseOrderDrug;

public interface PurchaseOrderDrugRepository extends JpaRepository<PurchaseOrderDrug, Long> {
	
	//@Query("SELECT * FROM purchase_order_drug")
	//public Set<PurchaseOrderDrug> findAllDrugs();
	public List<PurchaseOrderDrug> findAll();

	@Query("Select pod from PurchaseOrderDrug pod where pod.purchaseOrder.id=?1")
	public Set<PurchaseOrderDrug> findAllById(long id);

	

}
