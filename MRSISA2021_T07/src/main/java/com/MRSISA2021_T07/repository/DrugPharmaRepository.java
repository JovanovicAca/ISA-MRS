package com.MRSISA2021_T07.repository;

import java.util.Optional;
import java.util.Set;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugPharmacy;
import com.MRSISA2021_T07.model.Pharmacy;
@Service
public interface DrugPharmaRepository  extends JpaRepository<DrugPharmacy, Long>{

	@Query("Select dp from DrugPharmacy dp where dp.pharmacy.id=?1")//1
	public Set<DrugPharmacy> getPharmaDrugs(long pharmaID);
	
	//izvlaci jedan DrugPharmacy po id apoteke isifri leka
	@Query("Select dp from DrugPharmacy dp inner join Drug d on d.id = dp.drug.id where d.drugCode=?1 and dp.pharmacy.id=?2")
	public Optional<DrugPharmacy> findBydrug(String dID, long pID);
	
	//izvlaci DrugPharmacy.id po id apoteke i sifri leka
	@Query("Select dp.id from DrugPharmacy dp inner join Drug d on d.id = dp.drug.id where d.drugCode=?1 and dp.pharmacy.id=?2")
	public long findByDrug(String dID, long pID);
	
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("Select dp from DrugPharmacy dp where dp.drug=?1 and dp.pharmacy=?2")
	public DrugPharmacy findByDrugAndPharmacy(Drug d, Pharmacy ph);

	@Query("Select dp from DrugPharmacy dp where dp.drug.id=?1 and dp.pharmacy=?2")
	public DrugPharmacy findByDrugAndPharmacy1(long d, Pharmacy ph);
	
	//nalazi dp po leku
	@Query("Select dp from DrugPharmacy dp where dp.drug=?1")
	public DrugPharmacy findDrug(Drug drug);
}
