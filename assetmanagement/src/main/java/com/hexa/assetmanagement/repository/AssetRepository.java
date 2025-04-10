package com.hexa.assetmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.Asset;

public interface AssetRepository extends JpaRepository<Asset, Integer>{

	List<Asset> findByName(String name);

}
