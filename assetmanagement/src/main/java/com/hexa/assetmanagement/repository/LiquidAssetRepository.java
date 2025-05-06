package com.hexa.assetmanagement.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hexa.assetmanagement.model.LiquidAsset;

public interface LiquidAssetRepository extends JpaRepository<LiquidAsset, Integer>{
   
	Page<LiquidAsset> findByStatus(String status, Pageable pageable);
	List<LiquidAsset> findByName(String name);
}
