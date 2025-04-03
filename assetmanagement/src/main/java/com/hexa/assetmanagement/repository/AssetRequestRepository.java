package com.hexa.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.AssetRequest;

public interface AssetRequestRepository extends JpaRepository<AssetRequest, Integer> {

}
