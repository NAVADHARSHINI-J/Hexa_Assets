package com.hexa.assetmanagement.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	
	Logger logger = LoggerFactory.getLogger("LiquidAssetService");
	
	public LiquidAsset addliquidAsset(LiquidAsset liquidAsset) {
		// adding of a new liquid asset
		logger.info("A new liquid asset is added");
		return liquidAssetRepository.save(liquidAsset);
	}

	public LiquidAsset getLiquidAssetById(int id) throws InvalidIdException {
		Optional<LiquidAsset> optional = liquidAssetRepository.findById(id);
		if (optional.isEmpty())
			throw new InvalidIdException("Liquid asset Id is invalid!");
		return optional.get();
	}

	public List<LiquidAsset> getAllLiquidAsset(Pageable pageable) {
		//get all the liquid asset details
		return liquidAssetRepository.findAll(pageable).getContent();
	}

	public List<LiquidAsset> filterByStatus(String status) {
		//get all the liquid asset by status
		return liquidAssetRepository.findByStatus(status);
	}

	public List<LiquidAsset> filterByName(String name) {
		//get all liquid asset by name
		return liquidAssetRepository.findByName(name);
	}
}

