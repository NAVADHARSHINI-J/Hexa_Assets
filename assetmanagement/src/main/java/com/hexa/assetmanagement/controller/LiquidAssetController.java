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
import com.hexa.assetmanagement.model.LiquidAsset;
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

}
