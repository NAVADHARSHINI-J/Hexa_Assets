package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.LiquidAsset;
import com.hexa.assetmanagement.model.Manager;
import com.hexa.assetmanagement.service.LiquidAssetService;

@RestController
@RequestMapping("/api/liquidasset")
public class LiquidAssetController {

	@Autowired
	private LiquidAssetService liquidAssetService;

	@PostMapping("/add")
	public LiquidAsset addLiquidAsset(@RequestBody LiquidAsset liquidAsset) {
		return liquidAssetService.addliquidAsset(liquidAsset);
	}

	@GetMapping("/get/{id}")
	public LiquidAsset getLiquidAssetById(@PathVariable int id) throws InvalidIdException {
		return liquidAssetService.getLiquidAssetById(id);
	}

	@GetMapping("/getall")
	public List<LiquidAsset> getAllLiquidAsset(@RequestParam int page, @RequestParam int size) {
		Pageable pageable = PageRequest.of(page, size);
		return liquidAssetService.getAllLiquidAsset(pageable);
	}
	
	@GetMapping("/bystatus")
    public List<LiquidAsset> filterByStatus(@RequestParam String status) {
    	return liquidAssetService.filterByStatus(status);
    }
	
	@GetMapping("/byname")
    public List<LiquidAsset> filterByName(@RequestParam String name) {
    	return liquidAssetService.filterByName(name);
    }
	
	@DeleteMapping("/deleteby/{id}")
	public ResponseEntity<?> deleteById(@PathVariable int id) throws InvalidIdException {
		liquidAssetService.deleteById(id);
		return ResponseEntity.ok("Deleted successfully.....");
	}
	 
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateLiquidAsset(@PathVariable int id, @RequestBody LiquidAsset liquidAssetupdated) throws InvalidIdException {
	    LiquidAsset LiquidAssetupdated = liquidAssetService.updateLiquidAsset(id, liquidAssetupdated);
	    return ResponseEntity.ok("Updated sucessfully");
	}
}
