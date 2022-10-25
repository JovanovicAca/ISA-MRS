package com.MRSISA2021_T07.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.Pharmacy;
import com.MRSISA2021_T07.model.PurchaseOrder;
import com.MRSISA2021_T07.model.PurchaseOrderDrug;


@Service
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long>{
	
	public List<PurchaseOrder> findAll();
	
	//@Query("SELECT admin_id FROM Purchase_Order")
	//public List<Long> findAdminID();

	@Query("Select po from PurchaseOrder po where po.admin=?1")
	public Set<PurchaseOrder> findAllByAdmin(Admin a);

	@Query("Select po from PurchaseOrder po where po.pharma.id=?1")
	public Set<PurchaseOrder> findAllByPharma(long ph);

	@Query("Select po from PurchaseOrder po where po.admin.id=?1 and po.id=?2")
	public Optional<PurchaseOrder> findByAdminIdAndOrderId(long id, long orderId);

}
