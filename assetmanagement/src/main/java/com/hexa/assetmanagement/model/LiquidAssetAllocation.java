package com.hexa.assetmanagement.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class LiquidAssetAllocation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	 @Column(nullable=false)
    private LocalDate allocated_date;
	 @Column(nullable=false)
    private double allocated_amount;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public LocalDate getAllocated_date() {
		return allocated_date;
	}
	public void setAllocated_date(LocalDate allocated_date) {
		this.allocated_date = allocated_date;
	}
	public double getAllocated_amount() {
		return allocated_amount;
	}
	public void setAllocated_amount(double allocated_amount) {
		this.allocated_amount = allocated_amount;
	}
	
}
