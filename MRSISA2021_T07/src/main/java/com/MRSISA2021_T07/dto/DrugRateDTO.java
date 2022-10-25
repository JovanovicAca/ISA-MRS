package com.MRSISA2021_T07.dto;

import java.time.LocalDate;

import com.MRSISA2021_T07.model.Drug;
import com.MRSISA2021_T07.model.DrugOrderPatient;
import com.MRSISA2021_T07.model.RatingDrug;

public class DrugRateDTO {

	private long drugID;
	private String drugCode;
	private String drugName;
	private String instruction;
	private String drugType;
	private String drugShape;
	private String ingredients;
	private String contradiction;
	private String takingDose;
	private boolean selected;
	private float rating;
	private double myRating;
	private LocalDate ratingDate;
	
	public static DrugRateDTO transform(RatingDrug drugRate)
	{
		DrugRateDTO dto = new DrugRateDTO();
		Drug drug = drugRate.getDrug();
		
		dto.setDrugID(drug.getId());
		dto.setDrugCode(drug.getDrugCode());
		dto.setDrugName(drug.getName());
		dto.setDrugType(drug.getType());
		dto.setDrugShape(drug.getShape());
		dto.setInstruction(drug.getInstruction());
		dto.setIngredients(drug.getIngredients());
		dto.setContradiction(drug.getContradiction());
		dto.setTakingDose(drug.getTakingDose());
		dto.setSelected(false);
		dto.setRating(drug.getRating());
		dto.setMyRating(drugRate.getRating());
		dto.setRatingDate(drugRate.getRatingDate());
		return dto;
	}
	
	public static DrugRateDTO transformOrder(DrugOrderPatient order)
	{
		DrugRateDTO dto = new DrugRateDTO();
		Drug drug = order.getDrug();
		dto.setDrugID(drug.getId());
		dto.setDrugCode(drug.getDrugCode());
		dto.setDrugName(drug.getName());
		dto.setDrugType(drug.getType());
		dto.setDrugShape(drug.getShape());
		dto.setInstruction(drug.getInstruction());
		dto.setIngredients(drug.getIngredients());
		dto.setContradiction(drug.getContradiction());
		dto.setTakingDose(drug.getTakingDose());
		dto.setSelected(false);
		dto.setRating(drug.getRating());
		dto.setMyRating(0);
		dto.setRatingDate(null);
		return dto;
	}
	
	public DrugRateDTO() {};
	
	public DrugRateDTO(String drugCode, String drugName, String instruction, String drugType, String drugShape,
			String ingredients, String contradiction, String takingDose, boolean selected, float rating,
			double myRating, LocalDate ratingDate) {
		super();
		this.drugCode = drugCode;
		this.drugName = drugName;
		this.instruction = instruction;
		this.drugType = drugType;
		this.drugShape = drugShape;
		this.ingredients = ingredients;
		this.contradiction = contradiction;
		this.takingDose = takingDose;
		this.selected = selected;
		this.rating = rating;
		this.myRating = myRating;
		this.ratingDate = ratingDate;
	}

	public long getDrugID() {
		return drugID;
	}

	public void setDrugID(long drugID) {
		this.drugID = drugID;
	}

	public LocalDate getRatingDate() {
		return ratingDate;
	}

	public void setRatingDate(LocalDate ratingDate) {
		this.ratingDate = ratingDate;
	}

	public String getDrugCode() {
		return drugCode;
	}

	public void setDrugCode(String drugCode) {
		this.drugCode = drugCode;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	public String getDrugType() {
		return drugType;
	}

	public void setDrugType(String drugType) {
		this.drugType = drugType;
	}

	public String getDrugShape() {
		return drugShape;
	}

	public void setDrugShape(String drugShape) {
		this.drugShape = drugShape;
	}

	public String getIngredients() {
		return ingredients;
	}

	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}

	public String getContradiction() {
		return contradiction;
	}

	public void setContradiction(String contradiction) {
		this.contradiction = contradiction;
	}

	public String getTakingDose() {
		return takingDose;
	}

	public void setTakingDose(String takingDose) {
		this.takingDose = takingDose;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public double getMyRating() {
		return myRating;
	}

	public void setMyRating(double myRating) {
		this.myRating = myRating;
	}
}
