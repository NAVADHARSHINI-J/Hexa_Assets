package com.hexa.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.ServiceRequest;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest,Integer>{

}
