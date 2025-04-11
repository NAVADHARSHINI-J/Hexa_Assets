package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.AssetUnavailableException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.AssetAllocation;
import com.hexa.assetmanagement.service.AssetAllocationService;


@RestController
@RequestMapping("/api/assetallocation")
public class AssetAllocationController {

	@Autowired
	private AssetAllocationService assetAllocationService;

	@PostMapping("/add/{assetId}/{empId}")
	public AssetAllocation addAssetAllocation(@PathVariable int assetId
			, @PathVariable int empId,
			@RequestBody AssetAllocation assetAllocation) 
					throws InvalidIdException, AssetUnavailableException {
		
		return assetAllocationService.addAssetAllocation(assetId, empId, assetAllocation);
	}

	@GetMapping("/get/{AssetAllocationId}")
	public AssetAllocation getById(@PathVariable int AssetAllocationId) throws InvalidIdException {
		return assetAllocationService.getById(AssetAllocationId);
	}

	@GetMapping("/getall")
	public List<AssetAllocation> getAllAssetAllocation() {
		return assetAllocationService.getAllAssetAllocation();
	}
	
	@DeleteMapping("/delete-assetid/{AssetId}")
	public ResponseEntity<?> deleteByAssetId(@PathVariable int AssetId) throws InvalidIdException {
		String message =assetAllocationService.deleteByAssetId(AssetId);
		return ResponseEntity.ok(message);
	}
}




