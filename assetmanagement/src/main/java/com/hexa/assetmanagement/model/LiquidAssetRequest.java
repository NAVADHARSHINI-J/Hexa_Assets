package com.hexa.assetmanagement.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LiquidAssetRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  @Column(nullable=false)
  private LocalDate requestDate;
  @Column(nullable=false)
  private double requestedAmount;
  @Column(nullable=false,length = 2000)
  private String reason;
  private String status="pending";
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public LocalDate getRequestDate() {
	return requestDate;
}
public void setRequestDate(LocalDate requestDate) {
	this.requestDate = requestDate;
}
public double getRequestedAmount() {
	return requestedAmount;
}
public void setRequestedAmount(double requestedAmount) {
	this.requestedAmount = requestedAmount;
}
public String getReason() {
	return reason;
}
public void setReason(String reason) {
	this.reason = reason;
}
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}
  
    
    
}
