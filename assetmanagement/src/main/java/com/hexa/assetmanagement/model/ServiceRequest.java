package com.hexa.assetmanagement.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class ServiceRequest {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;
   @Column(nullable=false)
   private LocalDate request_date;
   @Column(nullable=false)
   private String reason;
   private byte[] image;
   
   
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
public String getReason() {
	return reason;
}
public void setReason(String reason) {
	this.reason = reason;
}
public byte[] getImage() {
	return image;
}
public void setImage(byte[] image) {
	this.image = image;
}
   
   
}