package com.MRSISA2021_T07.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.MRSISA2021_T07.model.Admin;
import com.MRSISA2021_T07.model.PUser;
import com.MRSISA2021_T07.model.Pharmacist;

public interface AdminRepository  extends JpaRepository<Admin, Long>{

	@Query("select a from Admin a where a.works =?1")
	public Admin getPharmaById(long id);

	@Query("select a.works from Admin a where a.id=?1")
	public long getPharmaId(long id);
  
	public Admin findByEmail(String email);
}
