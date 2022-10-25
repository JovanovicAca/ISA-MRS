package com.MRSISA2021_T07.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.Drug;
@Service
public interface DrugRepository extends JpaRepository<Drug, Long> {
	
	@Query("Select d from Drug d where d.drugCode=?1")
	public Drug findByCode(String code);//1

	@Query("Select d.name from Drug d where d.drugCode=:code")
	public String findDrugNameByCode(String code);

	@Query("Select d from Drug d join fetch d.replacements where d.drugCode=?1")
	public Drug findByCodeWithReplacements(String code);

	@Query("Select d.id from Drug d where d.drugCode=:code")
	public long findDrugIdByCode(String code);

	@Query("Select d.replacements from Drug d where d.drugCode=?1")
	public Set<Drug> findByCodeReplacements(String code);

}
