package com.hexa.assetmanagement.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
@Entity
public class LiquidAssetAllocation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	@Column(nullable=false)
    private LocalDate allocatedDate;
	@Column(nullable=false)
    private double allocatedAmount;
    @ManyToOne
	private Employee employee;
	@ManyToOne
	private LiquidAsset liquidAsset;
	 
	 
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public LiquidAsset getLiquidAsset() {
		return liquidAsset;
	}
	public void setLiquidAsset(LiquidAsset liquidAsset) {
		this.liquidAsset = liquidAsset;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public LocalDate getAllocatedDate() {
		return allocatedDate;
	}
	public void setAllocatedDate(LocalDate allocatedDate) {
		this.allocatedDate = allocatedDate;
	}
	public double getAllocatedAmount() {
		return allocatedAmount;
	}
	public void setAllocatedAmount(double allocatedAmount) {
		this.allocatedAmount = allocatedAmount;
	}
	
}
