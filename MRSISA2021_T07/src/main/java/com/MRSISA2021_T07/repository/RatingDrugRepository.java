package com.MRSISA2021_T07.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.RatingDrug;

@Service
public interface RatingDrugRepository extends JpaRepository<RatingDrug, Long>{

}
