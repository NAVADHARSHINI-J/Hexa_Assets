package com.hexa.assetmanagement.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@PostMapping("/add/{id}")
	public Asset addAsset(@RequestBody Asset asset,@PathVariable int id) throws InvalidIdException {
		Category category=categoryService.getById(id);
		asset.setCategory(category);
		return assetService.addAsset(asset);
	}
	
	@GetMapping("/getbyid/{id}")
	public Asset getById(@PathVariable int id) throws InvalidIdException {
		return assetService.getById(id);
	}
	
	@GetMapping("/getall")
	public List<Asset> getAll(@RequestParam int page,@RequestParam int size) {
		Pageable pageable= PageRequest.of(page, size);
		return assetService.getAll(pageable);
	}
}









