package com.hexa.assetmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.LiquidAssetRequest;

public interface LiquidAssetRequestRepository extends JpaRepository<LiquidAssetRequest,Integer>{

	List<LiquidAssetRequest> filterByStatus(String status);
	List<LiquidAssetRequest> findByLiquidAssetId(int liquidAssetId);
}
