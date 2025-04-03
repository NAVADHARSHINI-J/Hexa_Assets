package com.hexa.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.AssetAllocation;

public interface AssetAllocationRepository extends JpaRepository<AssetAllocation, Integer> {

}
