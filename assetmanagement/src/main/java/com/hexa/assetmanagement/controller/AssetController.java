package com.hexa.assetmanagement.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.Category;
import com.hexa.assetmanagement.service.AssetService;
import com.hexa.assetmanagement.service.CategoryService;

@RestController
@RequestMapping("/api/asset")
public class AssetController {

	@Autowired
	private AssetService assetService;
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("/public/hello")
	public String sayHello() {
		return "Welcome spring in public..";
	}
	
	@GetMapping("/private/hello")
	public String sayPrivateHello() {
		return "Welcome spring in private..";
	}
	
	@PostMapping("/add/{id}")
	//Adding assets using category Id.
	public Asset addAsset(@RequestBody Asset asset,@PathVariable int id) throws InvalidIdException {
		Category category=categoryService.getById(id);
		asset.setCategory(category);
		return assetService.addAsset(asset);
	}
	
	@GetMapping("/getbyid/{id}")
	//finding an asset using asset Id.
	public Asset getById(@PathVariable int id) throws InvalidIdException {
		return assetService.getById(id);
	}
	
	@GetMapping("/getall")
	//getting the list of assets
	public List<Asset> getAll(@RequestParam int page,@RequestParam int size) {
		Pageable pageable= PageRequest.of(page, size);
		return assetService.getAll(pageable);
	}
	
	@GetMapping("/getbyname")
	//filtering assets by asset name.
	public List<Asset> filterByName(@RequestParam String name){
		return assetService.filterByName(name);
	}
	
	@GetMapping("/getbycategory")
	//filtering assets by category
	public List<Asset> filterByCategory(@RequestParam String category){
		return assetService.filterByCategory(category);
	}
	
	@GetMapping("/getbystatus")
	//filtering assets by status
	public List<Asset> filterByStatus(@RequestParam String status){
		return assetService.filterByStatus(status);
	}
	
	@PutMapping("/update-asset/{id}")
	//update an existing asset with its id:
	public Asset updateAsset(@RequestBody Asset newAsset, @PathVariable int id) throws InvalidIdException {
		
		Asset oldAsset = assetService.getById(id);
		return assetService.updateAsset(newAsset, oldAsset);
	}
}









