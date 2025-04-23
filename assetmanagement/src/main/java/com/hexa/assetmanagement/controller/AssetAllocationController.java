package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.AssetUnavailableException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.AssetAllocation;
import com.hexa.assetmanagement.service.AssetAllocationService;


@RestController
@RequestMapping("/api/assetallocation")
@CrossOrigin(origins = "http://localhost:5173/")
public class AssetAllocationController {

	@Autowired
	private AssetAllocationService assetAllocationService;

	@PostMapping("/add/{assetId}/{empId}")
	public AssetAllocation addAssetAllocation(@PathVariable int assetId
			, @PathVariable int empId,
			@RequestBody AssetAllocation assetAllocation) 
					throws InvalidIdException, AssetUnavailableException {
		//add the asset allocation
		return assetAllocationService.addAssetAllocation(assetId, empId, assetAllocation);
	}

	@GetMapping("/get/{assetAllocationId}")
	public AssetAllocation getById(@PathVariable int assetAllocationId) 
			throws InvalidIdException {
		//get the asset allocation by id
		return assetAllocationService.getById(assetAllocationId);
	}

	@GetMapping("/getall")
	public List<AssetAllocation> getAllAssetAllocation() {
		//get all the asset allocation in database
		return assetAllocationService.getAllAssetAllocation();
	}
	
	@DeleteMapping("/delete-assetid/{assetId}")
	public ResponseEntity<?> deleteByAssetId(@PathVariable int assetId) throws InvalidIdException {
		//delete all the asset allocation by the given asset id
		String message =assetAllocationService.deleteByAssetId(assetId);
		return ResponseEntity.ok(message);
	}
	
	@DeleteMapping("/delete-empId/{empId}")
	public ResponseEntity<?> deleteByEmployeeId(@PathVariable int empId) 
			throws InvalidIdException {
		//delete all the asset allocation by the given employee id
		String message =assetAllocationService.deleteByEmployeeId(empId);
		return ResponseEntity.ok(message);
	}
	
	@PutMapping("/update/{allocationId}")
	public AssetAllocation update(@RequestBody AssetAllocation assetAllocation,
			@PathVariable int allocationId) throws InvalidIdException {
		//update the asset allocation
		return assetAllocationService.update(assetAllocation,allocationId);
	}
	
	@GetMapping("/byAssetId")
	public List<AssetAllocation> getAssetAllocationByAssetId(@RequestParam int assetId) 
			throws InvalidIdException {
		//filter the allocation by assset id
		return assetAllocationService.getAssetAllocationByAssetId(assetId);
	}
	
	@GetMapping("/byEmpId")
	public List<AssetAllocation> getAssetAllocationByEmployeeId(@RequestParam int empId) 
			throws InvalidIdException {
		//filter the allocation by employee id
		return assetAllocationService.getAssetAllocationByEmployeeId(empId);
	}
}




