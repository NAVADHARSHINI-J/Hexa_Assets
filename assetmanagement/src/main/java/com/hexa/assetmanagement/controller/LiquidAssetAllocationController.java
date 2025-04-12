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
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.LiquidAsset;
import com.hexa.assetmanagement.model.LiquidAssetAllocation;
import com.hexa.assetmanagement.service.EmployeeService;
import com.hexa.assetmanagement.service.LiquidAssetAllocationService;
import com.hexa.assetmanagement.service.LiquidAssetService;

@RestController
@RequestMapping("api/liquidassetallocation")
public class LiquidAssetAllocationController {

	@Autowired
    private LiquidAssetAllocationService liquidAssetAllocationService;
    
    @Autowired
    private EmployeeService employeeService;
    
    @Autowired
    private LiquidAssetService liquidAssetService;
    
    //  Get Liquid Assets By Employee Id, Get Employee By Liquid Asset's Id.

    @PostMapping("/add/{employeeId}/{liquidAssetId}")
    public LiquidAssetAllocation addLiquidAssetAllocation(
            @RequestBody LiquidAssetAllocation allocation,
            @PathVariable int employeeId,
            @PathVariable int liquidAssetId) throws InvalidIdException {
        
        Employee employee = employeeService.getById(employeeId);
        LiquidAsset liquidAsset = liquidAssetService.getLiquidAssetById(liquidAssetId);
        
        allocation.setEmployee(employee);
        allocation.setLiquidAsset(liquidAsset);
        
        return liquidAssetAllocationService.addLiquidAssetAllocation(allocation);
    }

    @GetMapping("/getbyid/{id}")
    public LiquidAssetAllocation getById(@PathVariable int id) throws InvalidIdException {
        return liquidAssetAllocationService.getById(id);
    }

    @GetMapping("/getall")
    public List<LiquidAssetAllocation> getAll(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return liquidAssetAllocationService.getAll(pageable);
    }
}

