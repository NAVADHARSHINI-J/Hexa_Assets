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
import com.hexa.assetmanagement.model.LiquidAssetRequest;
import com.hexa.assetmanagement.service.EmployeeService;
import com.hexa.assetmanagement.service.LiquidAssetRequestService;
import com.hexa.assetmanagement.service.LiquidAssetService;

@RestController
@RequestMapping("/api/liquidassetreq")
public class LiquidAssetRequestController {

	@Autowired
    private LiquidAssetRequestService liquidAssetRequestService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private LiquidAssetService liquidAssetService;
    

    @PostMapping("/add/{employeeId}/{liquidAssetId}")
    public LiquidAssetRequest addLiquidAssetRequest(
            @RequestBody LiquidAssetRequest request,
            @PathVariable int employeeId,
            @PathVariable int liquidAssetId) throws InvalidIdException {

        Employee employee = employeeService.getById(employeeId);
        LiquidAsset liquidAsset = liquidAssetService.getById(liquidAssetId);

        request.setEmployee(employee);
        request.setLiquidAsset(liquidAsset);

        return liquidAssetRequestService.addLiquidAssetRequest(request);
    }

    @GetMapping("/getbyid/{id}")
    public LiquidAssetRequest getById(@PathVariable int id) throws InvalidIdException {
        return liquidAssetRequestService.getById(id);
    }

    @GetMapping("/getall")
    public List<LiquidAssetRequest> getAll(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return liquidAssetRequestService.getAll(pageable);
    }
    
    @GetMapping("/bystatus")
    public List<LiquidAssetRequest> filterByStatus(@RequestParam String status) {
    	return liquidAssetRequestService.filterByStatus(status);
    }
    
    @GetMapping("/byliquidAssetId")
    public List<LiquidAssetRequest> filterByLiquidAssetId(@RequestParam int liquidAssetId) 
    		throws InvalidIdException {
    	//check asset with id is present in db or not
    	liquidAssetRequestService.getById(liquidAssetId);
    	return liquidAssetRequestService.filterByLiquidAssetId(liquidAssetId);
    }
    
    
    
    
    
}
