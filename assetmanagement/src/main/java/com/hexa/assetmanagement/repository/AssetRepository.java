package com.hexa.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.Asset;

public interface AssetRepository extends JpaRepository<Asset, Integer>{

}
