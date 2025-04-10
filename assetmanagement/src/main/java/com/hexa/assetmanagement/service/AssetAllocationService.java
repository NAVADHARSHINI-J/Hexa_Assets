package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.AssetUnavailableException;
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
			throws InvalidIdException, AssetUnavailableException {
		//check the asset id
		Asset asset = assetService.getById(assetId);
		//check the quantity of the asset
		if(asset.getQuanity()<=0)
			throw new AssetUnavailableException("asset is not available.....");
		assetAllocation.setAsset(asset);
		//check the allocation date
		if(assetAllocation.getAllocationDate()==null)
			assetAllocation.setAllocationDate(LocalDate.now());
		//check the employee id and add it to asset allocation
		Employee employee = employeeService.getById(empId);
		assetAllocation.setEmployee(employee);
		//After allocation reduce the one quantity of the asset 
		asset.setQuanity(asset.getQuanity()-1);
		assetService.addAsset(asset);

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

	public void deleteByAssetId(int id) throws InvalidIdException {
		//check that the asset id is found or not
		Asset asset=assetService.getById(id);
		//find all the assetallocation with this asset
		List<AssetAllocation> list=assetAllocationRepository.findAll().stream()
		.filter(aa->aa.getAsset().equals(asset)).toList();
		//delete the assetallocation
		assetAllocationRepository.deleteAll(list);
		
	}

}
