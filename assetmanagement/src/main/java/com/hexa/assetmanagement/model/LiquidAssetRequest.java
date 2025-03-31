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
  private LocalDate request_date;
  @Column(nullable=false)
  private double requested_amount;
  @Column(nullable=false)
  private String reason;
  private String status="pending";
  
  
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public LocalDate getRequest_date() {
	return request_date;
}
public void setRequest_date(LocalDate request_date) {
	this.request_date = request_date;
}
public double getRequested_amount() {
	return requested_amount;
}
public void setRequested_amount(double requested_amount) {
	this.requested_amount = requested_amount;
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
