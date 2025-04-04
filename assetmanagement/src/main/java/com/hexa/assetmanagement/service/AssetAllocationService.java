package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.AssetAllocation;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.repository.AssetAllocationRepository;

@Service
public class AssetAllocationService {

	@Autowired
	private AssetService assetService;

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private AssetAllocationRepository assetAllocationRepository;

	public AssetAllocation addAssetAllocation(int assetId, int empId, AssetAllocation assetAllocation)
			throws InvalidIdException {
		Asset asset = assetService.getById(assetId);
		assetAllocation.setAsset(asset);
		if(assetAllocation.getAllocationDate()==null)
			assetAllocation.setAllocationDate(LocalDate.now());
		Employee employee = employeeService.getById(empId);
		assetAllocation.setEmployee(employee);

		return assetAllocationRepository.save(assetAllocation);
	}

	public AssetAllocation getById(int assetAllocationId) throws InvalidIdException {
		Optional<AssetAllocation> optional = assetAllocationRepository.findById(assetAllocationId);
		if (optional.isEmpty())
			throw new InvalidIdException("Asset Allocation Id is invalid");
		return optional.get();
	}

	public List<AssetAllocation> getAllAssetAllocation() {
		return assetAllocationRepository.findAll();
	}

}
