package com.hexa.assetmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.Asset;

public interface AssetRepository extends JpaRepository<Asset, Integer>{

	//declaring to find the list of assets with it's name.
	List<Asset> findByName(String name);

	//declaring to find the list of assets with it's category.
	List<Asset> findByCategoryName(String category);

	//declaring to find the list of assets with it's status.
	List<Asset> findByStatus(String status);

}
