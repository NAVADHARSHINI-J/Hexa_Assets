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
import com.hexa.assetmanagement.model.AssetRequest;
import com.hexa.assetmanagement.service.AssetRequestService;

@RestController
@RequestMapping("/api/assetrequest")
public class AssetRequestController {

	@Autowired
	private AssetRequestService assetRequestService;

	@PostMapping("/add/{AssetId}/{EmpId}")
	public AssetRequest addAssetRequest(@PathVariable int assetId, @PathVariable int EmpId,
			@RequestBody AssetRequest assetRequest) throws InvalidIdException {

		return assetRequestService.addAssetRequest(assetId, EmpId, assetRequest);
	}

	@GetMapping("/get/{id}")
	public AssetRequest getById(@PathVariable int assetRequestId) throws InvalidIdException {
		return assetRequestService.getById(assetRequestId);
	}

	@GetMapping("/getall")
	public List<AssetRequest> getAllAssetRequest() {
		return assetRequestService.getAllAssetRequest();
	}
}
