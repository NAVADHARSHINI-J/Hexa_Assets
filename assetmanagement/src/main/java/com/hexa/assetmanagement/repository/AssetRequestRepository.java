package com.hexa.assetmanagement.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.AssetRequest;
import com.hexa.assetmanagement.model.Employee;

public interface AssetRequestRepository extends JpaRepository<AssetRequest, Integer> {

	List<AssetRequest> findByStatus(String status);

	List<AssetRequest> findByEmployee(Employee employee);

	List<AssetRequest> findByAsset(Asset asset);

	List<AssetRequest> findByRequestDate(LocalDate requestDate);

}
