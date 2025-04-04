package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.LiquidAssetRequest;
import com.hexa.assetmanagement.repository.LiquidAssetRequestRepository;
@Service
public class LiquidAssetRequestService {
  
	 @Autowired
	    private LiquidAssetRequestRepository liquidAssetRequestRepository;

	    public LiquidAssetRequest addLiquidAssetRequest(LiquidAssetRequest request) {
	    	if(request.getRequestDate()==null)
	    		request.setRequestDate(LocalDate.now());
	        return liquidAssetRequestRepository.save(request);
	    }

	    public LiquidAssetRequest getById(int id) throws InvalidIdException {
	        Optional<LiquidAssetRequest> optional = liquidAssetRequestRepository.findById(id);
	        if (optional.isEmpty()) {
	            throw new InvalidIdException("Liquid Asset Request ID is invalid...");
	        }
	        return optional.get();
	    }

	    public List<LiquidAssetRequest> getAll(Pageable pageable) {
	        return liquidAssetRequestRepository.findAll(pageable).getContent();
	    }
	}
