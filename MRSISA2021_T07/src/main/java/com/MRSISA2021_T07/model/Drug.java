package com.MRSISA2021_T07.model;

import java.util.ArrayList;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Drug {
	@Id
	@SequenceGenerator(name = "drugSeqGen", sequenceName = "drugSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "drugSeqGen")
	private long id;
	@Column(unique = true)
	private String drugCode;
	@Column
	private String name;
	@Column
	private String instruction;
	@Column
	private String types;
	@Column
	private String shape;
	@Column
	private String ingredients;
	@Column
	private String contradiction;
	@Column
	private String takingDose;
	@Column
	private float rating;
	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Drug> replacements;
	@Column
	private int points; // Loyalty poeni koji se dobiju sa ovim lekom
	
	// @Column
	// Lista zamenskih lekova
//	private Arraylist ili string? replacementDrugs;

	public Drug() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDrugCode() {
		return drugCode;
	}

	public void setDrugCode(String drugCode) {
		this.drugCode = drugCode;
	}

	public String getIngredients() {
		return ingredients;
	}

	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
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

	public String getType() {
		return types;
	}

	public void setType(String type) {
		this.types = type;
	}

	public String getShape() {
		return shape;
	}

	public void setShape(String shape) {
		this.shape = shape;
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
	
	public String getTypes() {
		return types;
	}

	public void setTypes(String types) {
		this.types = types;
	}

	public Set<Drug> getReplacements() {
		return replacements;
	}

	public void setReplacements(Set<Drug> replacements) {
		this.replacements = replacements;
	}
	
	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public Drug(long id, String drugCode, String name, String instruction, String type, String shape, String ingredients,
			String contradiction, String takingDose) {
		super();
		this.id = id;
		this.drugCode = drugCode;
		this.name = name;
		this.instruction = instruction;
		this.types = type;
		this.shape = shape;
		this.ingredients = ingredients;
		this.contradiction = contradiction;
		this.takingDose = takingDose;
	}

}
