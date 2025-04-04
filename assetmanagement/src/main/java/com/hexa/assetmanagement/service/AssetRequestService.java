package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.AssetRequest;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.repository.AssetRequestRepository;

@Service
public class AssetRequestService {

	@Autowired
	private AssetService assetService;

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private AssetRequestRepository assetRequestRepository;

	public AssetRequest addAssetRequest(int assetId, int empId, AssetRequest assetRequest) throws InvalidIdException {
		Asset asset = assetService.getById(assetId);
		assetRequest.setAsset(asset);

		Employee employee = employeeService.getById(empId);
		assetRequest.setEmployee(employee);
		
		if(assetRequest.getRequestDate()==null)
			assetRequest.setRequestDate(LocalDate.now());

		return assetRequestRepository.save(assetRequest);
	}

	public AssetRequest getById(int assetRequestId) throws InvalidIdException {
		Optional<AssetRequest> optional = assetRequestRepository.findById(assetRequestId);
		if (optional.isEmpty())
			throw new InvalidIdException("Asset Request Id is invalid");
		return optional.get();
	}

	public List<AssetRequest> getAllAssetRequest() {
		return assetRequestRepository.findAll();
	}

}
