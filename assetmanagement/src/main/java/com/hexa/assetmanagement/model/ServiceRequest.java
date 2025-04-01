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
   private LocalDate requestDate;
   @Column(nullable=false)
   private String reason;
   private String imageUrl;
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
public String getReason() {
	return reason;
}
public void setReason(String reason) {
	this.reason = reason;
}
public String getImageUrl() {
	return imageUrl;
}
public void setImageUrl(String imageUrl) {
	this.imageUrl = imageUrl;
}
   
   
}