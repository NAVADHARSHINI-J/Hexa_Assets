package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.LiquidAssetAllocation;
import com.hexa.assetmanagement.repository.LiquidAssetAllocationRepository;

@Service
public class LiquidAssetAllocationService {

	@Autowired
    private LiquidAssetAllocationRepository liquidAssetAllocationRepository;

    public LiquidAssetAllocation addLiquidAssetAllocation(LiquidAssetAllocation allocation) {
    	if(allocation.getAllocatedDate()==null)
    		allocation.setAllocatedDate(LocalDate.now());
        return liquidAssetAllocationRepository.save(allocation);
    }

    public LiquidAssetAllocation getById(int id) throws InvalidIdException {
        Optional<LiquidAssetAllocation> optional = liquidAssetAllocationRepository.findById(id);
        if (optional.isEmpty()) {
            throw new InvalidIdException("Liquid Asset Allocation ID is invalid...");
        }
        return optional.get();
    }

    public List<LiquidAssetAllocation> getAll(Pageable pageable) {
        return liquidAssetAllocationRepository.findAll(pageable).getContent();
    }
}
