package com.hexa.assetmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.LiquidAsset;
import com.hexa.assetmanagement.model.LiquidAssetAllocation;
import com.hexa.assetmanagement.repository.LiquidAssetAllocationRepository;
import com.hexa.assetmanagement.repository.LiquidAssetRepository;

@Service
public class LiquidAssetService {
	@Autowired
	private LiquidAssetRepository liquidAssetRepository;
	
	@Autowired
	private  LiquidAssetAllocationRepository liquidAssetAllocationRepository;
	
	
	public LiquidAsset addliquidAsset(LiquidAsset liquidAsset) {
		return liquidAssetRepository.save(liquidAsset);
	}

	public LiquidAsset getLiquidAssetById(int id) throws InvalidIdException {
		Optional<LiquidAsset> optional = liquidAssetRepository.findById(id);
		if (optional.isEmpty())
			throw new InvalidIdException("Liquid asset Id is invalid!");
		return optional.get();
	}

	public List<LiquidAsset> getAllLiquidAsset(Pageable pageable) {
		return liquidAssetRepository.findAll(pageable).getContent();
	}

	public List<LiquidAsset> filterByStatus(String status) {
		return liquidAssetRepository.findByStatus(status);
	}

	public List<LiquidAsset> filterByName(String name) {
		return liquidAssetRepository.findByName(name);
	}

	public void deleteById(int id) throws InvalidIdException {
	    // Check if the liquid asset exists
	    LiquidAsset liquidAsset = getLiquidAssetById(id);

	    // Find all liquid asset allocations with this liquid asset
	    List<LiquidAssetAllocation> list = liquidAssetAllocationRepository.findAll().stream()
	        .filter(laa -> laa.getLiquidAsset().equals(liquidAsset))
	        .toList();

	    // Delete the liquid asset allocations
	    liquidAssetAllocationRepository.deleteAll(list);
	}
}

