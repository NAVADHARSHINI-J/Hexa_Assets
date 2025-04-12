package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	
	Logger logger=LoggerFactory.getLogger("AssetAllocationService");

	public AssetAllocation addAssetAllocation(int assetId, int empId,
			AssetAllocation assetAllocation)
			throws InvalidIdException, AssetUnavailableException {
		//check the asset id
		Asset asset = assetService.getById(assetId);
		//check the quantity of the asset
		if(asset.getQuantity()<=0)
			throw new AssetUnavailableException("asset is not available.....");
		assetAllocation.setAsset(asset);
		//check the allocation date
		if(assetAllocation.getAllocationDate()==null)
			assetAllocation.setAllocationDate(LocalDate.now());
		//check the employee id and add it to asset allocation
		Employee employee = employeeService.getById(empId);
		assetAllocation.setEmployee(employee);
		//After allocation reduce the one quantity of the asset 

		asset.setQuantity((asset.getQuantity())-1);

		assetService.addAsset(asset);
		
		logger.info("Asset "+asset.getName()+"is assigned for the employee "+employee.getName());
		
		return assetAllocationRepository.save(assetAllocation);
	}

	public AssetAllocation getById(int assetAllocationId) throws InvalidIdException {
		//check the asset allocation is find with the id or not
		Optional<AssetAllocation> optional = assetAllocationRepository.findById(assetAllocationId);
		if (optional.isEmpty())
			throw new InvalidIdException("Asset Allocation Id is invalid");
		logger.info("Asser allocation is found with id "+optional.get().getId());
		return optional.get();
	}

	public List<AssetAllocation> getAllAssetAllocation() {
		logger.info("All asset allocation is retrieved from database");
		return assetAllocationRepository.findAll();
	}

	public String deleteByAssetId(int assetId) throws InvalidIdException {
		//check that the asset id is found or not
		Asset asset=assetService.getById(assetId);
		//find all the assetallocation with this asset
		List<AssetAllocation> list=assetAllocationRepository.findAll().stream()
		.filter(a->a.getAsset().getId()==asset.getId()).toList();
		//delete the assetallocation
		assetAllocationRepository.deleteAll(list);
		logger.info("Asset allocation with asset Id "+asset.getId()+" is deleted");
		return "Assset allocation is deleted successfully";
	}

	public String deleteByEmployeeId(int empId) throws InvalidIdException {
		//check that the employee with id is found or not
		Employee employee=employeeService.getById(empId);
		//find all the asset allocation with this Employee id
		List<AssetAllocation> list=assetAllocationRepository.findAll().stream()
				.filter(a->a.getEmployee().getId()==employee.getId()).toList();
		//delete the assetallocation
		assetAllocationRepository.deleteAll(list);
		logger.info("Asset allocation with employee Id "+employee.getId()+" is deleted");
		return "Assset allocation is deleted successfully";
	}

	public AssetAllocation update(AssetAllocation assetAllocation, int allocationId)
			throws InvalidIdException {
		//get the asset allocation by the id
		AssetAllocation assetAllocation1 =getById(allocationId);
		//check the allocation date
		if(assetAllocation.getAllocationDate()!=null)
			assetAllocation1.setAllocationDate(assetAllocation.getAllocationDate());
		//check the employee
		if(assetAllocation.getEmployee()!=null)
			assetAllocation1.setEmployee(assetAllocation.getEmployee());
		//check the asset
		if(assetAllocation.getAsset()!=null)
			assetAllocation1.setAsset(assetAllocation.getAsset());
		//if the return date of the asset allocation is null then return date 
		//will be the current date
		if(assetAllocation.getReturnDate()==null)
			assetAllocation1.setReturnDate(LocalDate.now());
		//if return date is not null
		if(assetAllocation.getReturnDate()!=null)
			assetAllocation1.setReturnDate(assetAllocation.getReturnDate());
		System.out.println(assetAllocation.getStatus());
		//make the status as returned if they not give anything
		assetAllocation1.setStatus(
			    "ALLOCATED".equalsIgnoreCase(assetAllocation.getStatus()) ?
			    		"RETURNED" : assetAllocation.getStatus()
			);
		logger.info("Asset allocation is updated");
		//save it in the asset allocation
		return assetAllocationRepository.save(assetAllocation1);
	}

	public List<AssetAllocation> getAssetAllocationByAssetId(int assetId) 
			throws InvalidIdException {
		//check that asset is found with assetid
		Asset asset=assetService.getById(assetId);
		logger.info("Asset allocation is retrieved by assetId "+asset.getId());
		//get all the records by asset
		return assetAllocationRepository.findByAsset(asset);
	}
	public List<AssetAllocation> getAssetAllocationByEmployeeId(int empId) 
			throws InvalidIdException {
		//check that employee is found with empId
		Employee employee=employeeService.getById(empId);
		logger.info("Asset allocation is retrieved by employee Id "+employee.getId());
		//get all the records by employee
		return assetAllocationRepository.findByEmployee(employee);
	}

}
