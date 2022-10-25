package com.MRSISA2021_T07.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.MRSISA2021_T07.model.RatingDermatologist;

@Service
public interface RatingDermatologistRepository extends JpaRepository<RatingDermatologist, Long>{

}
