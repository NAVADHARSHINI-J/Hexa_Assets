package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

import com.hexa.assetmanagement.dto.AssetDto;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.Category;
import com.hexa.assetmanagement.service.AssetService;
import com.hexa.assetmanagement.service.CategoryService;

@RestController
@RequestMapping("/api/asset")
@CrossOrigin(origins = "http://localhost:5173/")
public class AssetController {

	@Autowired
	private AssetService assetService;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private AssetDto assetDto;
	@Autowired
	private ServiceRequestController serviceRequestController;
	@Autowired
	private AssetRequestController assetRequestController;
	@Autowired
	private AssetAllocationController assetAllocationController;

	@GetMapping("/public/hello")
	public String sayHello() {
		return "Welcome spring in public..";
	}

	@GetMapping("/private/hello")
	public String sayPrivateHello() {
		return "Welcome spring in private..";
	}

	/*
	 * Adding assets using category Id. get the category by it's id and set the
	 * category to asset.
	 */
	@PostMapping("/add/{categoryId}")
	public Asset addAsset(@RequestBody Asset asset, @PathVariable int categoryId) throws InvalidIdException {
		Category category = categoryService.getById(categoryId);
		asset.setCategory(category);
		return assetService.addAsset(asset);
	}

	/*
	 * finding an asset using asset Id.
	 */
	@GetMapping("/getbyid/{assetId}")
	public Asset getById(@PathVariable int assetId) throws InvalidIdException {
		return assetService.getById(assetId);
	}

	/*
	 * getting the list of assets as a page and returning it as asset dto.
	 */
	@GetMapping("/getall")
	public AssetDto getAll(@RequestParam int page, @RequestParam int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Asset> asset = assetService.getAll(pageable);
		assetDto.setCurrentPage(page);
		assetDto.setList(asset.getContent());
		assetDto.setSize(size);
		assetDto.setTotalElements((int) asset.getTotalElements());
		assetDto.setTotalPages(asset.getTotalPages());
		return assetDto;
	}

	/*
	 * filtering assets by asset name and returning it as the list. getting the
	 * asset name as a string thru request param.
	 */
	@GetMapping("/getbyname")
	public List<Asset> filterByName(@RequestParam String name) {
		return assetService.filterByName(name);
	}

	/*
	 * filtering assets by category bu getting the category as a string by request
	 * param and returning as page of assset dto
	 */
	@GetMapping("/getbycategory")
	public AssetDto filterByCategory(@RequestParam String category, @RequestParam int page, @RequestParam int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Asset> asset = assetService.filterByCategory(category, pageable);
		assetDto.setCurrentPage(page);
		assetDto.setList(asset.getContent());
		assetDto.setSize(size);
		assetDto.setTotalElements((int) asset.getTotalElements());
		assetDto.setTotalPages(asset.getTotalPages());
		return assetDto;
	}

	/*
	 * filtering assets by status, getting the status as a string thru the
	 * request-param. returning the lsit of assets.
	 */
	@GetMapping("/getbystatus")
	public List<Asset> filterByStatus(@RequestParam String status) {
		return assetService.filterByStatus(status);
	}

	/*
	 * update an existing asset with its id: and also getting the new asset
	 * reference as a request body getting the old asset by its id and passing the
	 * new asset and old asset to the service.
	 */
	@PutMapping("/update-asset/{assetId}")
	public Asset updateAsset(@RequestBody Asset newAsset, @PathVariable int assetId) throws InvalidIdException {

		Asset oldAsset = assetService.getById(assetId);
		return assetService.updateAsset(newAsset, oldAsset);
	}

	/*
	 * delete an existing asset with its id before deleting it need to delete in
	 * other classes as well as the asset is being a fk in other classes such as
	 * assetRequest, assetAllocation, and serviceRequest
	 */
	@DeleteMapping("/delete/{assetId}")
	public String deleteAssetById(@PathVariable int assetId) throws InvalidIdException {
		Asset asset = assetService.getById(assetId);

		// deleting in service request
		serviceRequestController.deleteByAssetId(asset.getId());
		// deleting in asset request
		assetRequestController.deleteAssetRequestByAsset(asset.getId());
		// deleting in asset allocation
		assetAllocationController.deleteByAssetId(asset.getId());

		return assetService.deleteAssetById(asset);
	}
}
