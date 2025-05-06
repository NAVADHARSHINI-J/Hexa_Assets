package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

import com.hexa.assetmanagement.dto.LiquidAssetDto;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.LiquidAsset;
import com.hexa.assetmanagement.service.LiquidAssetService;

@RestController
@RequestMapping("/api/liquidasset")
//@CrossOrigin(origins = "http://localhost:5173/")
public class LiquidAssetController {

	@Autowired
	private LiquidAssetService liquidAssetService;
	
	@Autowired
	private LiquidAssetDto liquidAssetDto;

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
	public LiquidAssetDto getAll(@RequestParam int page, @RequestParam int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<LiquidAsset> liquidAssetPage = liquidAssetService.getAll(pageable);
		liquidAssetDto.setList(liquidAssetPage.getContent());
		//typecasting because get total elements returns long.
		liquidAssetDto.setTotalElements((int)liquidAssetPage.getTotalElements());
		liquidAssetDto.setTotalPages(liquidAssetPage.getTotalPages());
		liquidAssetDto.setSize(size);
		liquidAssetDto.setCurrentPage(page);
		 
		return liquidAssetDto;
	}

	@GetMapping("/bystatus/{status}")
    public LiquidAssetDto getByStatus(@PathVariable String status, @RequestParam int page, @RequestParam int size) {
        // logic to retrieve assets by status
		Pageable pageable = PageRequest.of(page, size);
		Page<LiquidAsset> liquidAssetPage = liquidAssetService.filterByStatus(status, pageable);
		liquidAssetDto.setList(liquidAssetPage.getContent());
		liquidAssetDto.setSize(size);
		liquidAssetDto.setTotalPages(liquidAssetPage.getTotalPages());
		liquidAssetDto.setTotalElements((int)liquidAssetPage.getTotalElements());
		liquidAssetDto.setCurrentPage(page);
        return liquidAssetDto; 
    }
	
	@GetMapping("/byname/{name}")
    public List<LiquidAsset> filterByName(@PathVariable String name) {
		// get liquid asset by name
    	return liquidAssetService.filterByName(name);
    }
	
	@PutMapping("/update/{liquidAssetId}") 
	public LiquidAsset updateLiquidAsset(@RequestBody LiquidAsset liquidAsset,
	                                     @PathVariable int liquidAssetId) throws InvalidIdException {
		//update the liquid asset with the given liquid assetId
	    return liquidAssetService.update(liquidAsset, liquidAssetId);
	}
	
	@DeleteMapping("/delete/{liquidAssetId}")
	public ResponseEntity<String> deleteById(@PathVariable int liquidAssetId) throws InvalidIdException {
	    liquidAssetService.deleteById(liquidAssetId);
	    //delete the liquid asset of the id
	    return ResponseEntity.ok("LiquidAsset with ID " + liquidAssetId + " deleted successfully.");
	}
}  
 
