package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.AssetAllocation;
import com.hexa.assetmanagement.service.AssetAllocationService;


@RestController
@RequestMapping("/api/assetallocation")
public class AssetAllocationController {

	@Autowired
	private AssetAllocationService assetAllocationService;

	@PostMapping("/add/{assetId}/{EmpId}")
	public AssetAllocation addAssetAllocation(@PathVariable int assetId, @PathVariable int EmpId,
			@RequestBody AssetAllocation assetAllocation) throws InvalidIdException {
		
		return assetAllocationService.addAssetAllocation(assetId, EmpId, assetAllocation);
	}

	@GetMapping("/get/{id}")
	public AssetAllocation getById(@PathVariable int id) throws InvalidIdException {
		return assetAllocationService.getById(id);
	}

	@GetMapping("/getall")
	public List<AssetAllocation> getAllAssetAllocation() {
		return assetAllocationService.getAllAssetAllocation();
	}
}
