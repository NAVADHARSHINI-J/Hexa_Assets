package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	 
	Logger logger = LoggerFactory.getLogger("LiquidAssetRequestService");


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

		public List<LiquidAssetRequest> filterByStatus(String status) {
			return liquidAssetRequestRepository.filterByStatus(status);
		}

		public List<LiquidAssetRequest> filterByLiquidAssetId(int liquidAssetId) {
				logger.info("Service Request is filtered by Asset Id ");
				return liquidAssetRequestRepository.findByLiquidAssetId(liquidAssetId);
		}

		public LiquidAssetRequest getByEmployeeId(int id) {
			// TODO Auto-generated method stub
			return null;
		}
		
	}
