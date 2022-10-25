package com.MRSISA2021_T07.dto;

import javax.persistence.Column;

import com.MRSISA2021_T07.model.Drug;

public class DrugDTO {
	private String drugCode;
	private String name;
	private String instruction;
	private String types;
	private String shape;
	private String ingredients;
	private String contradiction;
	private String takingDose;
	private boolean selected;
	private double rating;
	
	public DrugDTO() {}
	
	public DrugDTO(Drug d) 
	{
		drugCode = d.getDrugCode();
		name = d.getName();
		instruction = d.getInstruction();
		types = d.getTypes();
		shape = d.getShape();
		ingredients  = d.getIngredients();
		contradiction = d.getContradiction();
		takingDose = d.getTakingDose();
		rating = d.getRating();
		selected = false;
	}
	
	
	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	public String getDrugCode() {
		return drugCode;
	}
	public void setDrugCode(String drugCode) {
		this.drugCode = drugCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getInstruction() {
		return instruction;
	}
	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}
	public String getTypes() {
		return types;
	}
	public void setTypes(String types) {
		this.types = types;
	}
	public String getShape() {
		return shape;
	}
	public void setShape(String shape) {
		this.shape = shape;
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
	
}
