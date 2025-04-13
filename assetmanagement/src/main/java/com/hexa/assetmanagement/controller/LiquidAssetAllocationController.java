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

    @PostMapping("/add/{employeeId}/{liquidAssetId}")
    public LiquidAssetAllocation addLiquidAssetAllocation(
            @RequestBody LiquidAssetAllocation allocation,
            @PathVariable int employeeId,
            @PathVariable int liquidAssetId) throws InvalidIdException {
        // Fetch the employee by ID
        Employee employee = employeeService.getById(employeeId);
        // Fetch the liquid asset by ID
        LiquidAsset liquidAsset = liquidAssetService.getById(liquidAssetId);
        // Set the employee and liquid asset references in the allocation object
        allocation.setEmployee(employee);
        allocation.setLiquidAsset(liquidAsset);
        // Save and return the new allocation
        return liquidAssetAllocationService.addLiquidAssetAllocation(allocation);
    }

    @GetMapping("/getbyid/{id}")
    public LiquidAssetAllocation getById(@PathVariable int id) throws InvalidIdException {
    	//get the liquid asset allocated by using the given id
        return liquidAssetAllocationService.getById(id);
    }

    @GetMapping("/getall")
    public List<LiquidAssetAllocation> getAll(@RequestParam int page, @RequestParam int size) {
    	//getting all liquid assets allocated from the database
        Pageable pageable = PageRequest.of(page, size);
        return liquidAssetAllocationService.getAll(pageable);
    }
    
    @GetMapping("/employee/{employeeId}")
    public List<LiquidAssetAllocation> getLiquidAssetByEmployeeId(@PathVariable int employeeId) throws InvalidIdException {
    	//get the liquid asset allocation by employee id
        return liquidAssetAllocationService.getLiquidAssetByEmployeeId(employeeId);
    }
    
    @GetMapping("/liquidAsset/{liquidAssetId}/employees")
    public List<Employee> getEmployeesByLiquidAssetId(@PathVariable int liquidAssetId) throws InvalidIdException {
    	//get employees allocated by the liquidAsset ID
        return liquidAssetAllocationService.getEmployeesByLiquidAssetId(liquidAssetId);
    }
    
    @DeleteMapping("/delete/by-liquid-asset/{id}")
    public ResponseEntity<String> deleteByLiquidAssetId(@PathVariable int id) throws InvalidIdException {
    	//delete the liquid asset allocation by id
        String msg = liquidAssetAllocationService.deleteByLiquidAssetId(id);
        return ResponseEntity.ok(msg);
    }
    
    @DeleteMapping("/delete/by-employee/{id}")
    public ResponseEntity<String> deleteByEmployeeId(@PathVariable int id) throws InvalidIdException {
    	//delete the liquid asset allocation by employee id 
        String msg = liquidAssetAllocationService.deleteByEmployeeId(id);
        return ResponseEntity.ok(msg);
    }

}

