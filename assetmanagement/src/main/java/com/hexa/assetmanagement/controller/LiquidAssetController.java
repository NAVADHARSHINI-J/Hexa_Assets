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
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.LiquidAsset;
import com.hexa.assetmanagement.service.LiquidAssetService;

@RestController
@RequestMapping("/api/liquidasset")
public class LiquidAssetController {

	@Autowired
	private LiquidAssetService liquidAssetService;

	@PostMapping("/add")
	public LiquidAsset addLiquidAsset(@RequestBody LiquidAsset liquidAsset) {
		//Adding new liquid Asset   
		return liquidAssetService.addliquidAsset(liquidAsset);
	}

	@GetMapping("/get/{id}")
	public LiquidAsset getById(@PathVariable int id) throws InvalidIdException {
		//get liquid asset using id
		return liquidAssetService.getById(id);
	}

	@GetMapping("/getall")
	public List<LiquidAsset> getAll(@RequestParam int page, @RequestParam int size) {
		Pageable pageable = PageRequest.of(page, size);
		//getting all liquid assets from the database
		return liquidAssetService.getAll(pageable);
	}
	
	@GetMapping("/bystatus")
    public List<LiquidAsset> filterByStatus(@RequestParam String status) {
		//get the liquid assets by status
    	return liquidAssetService.filterByStatus(status);
    }
	
	@GetMapping("/byname")
    public List<LiquidAsset> filterByName(@RequestParam String name) {
		// get liquid asset by name
    	return liquidAssetService.filterByName(name);
    }
	
	@PutMapping("/update/{liquidAssetId}")
	public LiquidAsset updateLiquidAsset(@RequestBody LiquidAsset liquidAsset,
	                                     @PathVariable int liquidAssetId) throws InvalidIdException {
		//update the liquid asset with the given liquid assetId
	    return liquidAssetService.update(liquidAsset, liquidAssetId);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteById(@PathVariable int id) throws InvalidIdException {
	    liquidAssetService.deleteById(id);
	    //delete the liquid asset of the id
	    return ResponseEntity.ok("LiquidAsset with ID " + id + " deleted successfully.");
	}
	
	
 
}  
 
