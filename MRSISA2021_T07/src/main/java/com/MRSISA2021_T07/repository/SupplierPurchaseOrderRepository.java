package com.MRSISA2021_T07.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.SupplierPurchaseOrder;

@Service
public interface SupplierPurchaseOrderRepository extends JpaRepository<SupplierPurchaseOrder, Long>{
	

	public List<SupplierPurchaseOrder> findAll();

	@Query("Select spo from SupplierPurchaseOrder spo where spo.orderId=?1")
	public Set<SupplierPurchaseOrder> findByOrderId(Long l);

	
	
}
