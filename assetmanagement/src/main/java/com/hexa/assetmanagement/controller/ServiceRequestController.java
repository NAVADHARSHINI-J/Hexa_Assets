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
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.ServiceRequest;
import com.hexa.assetmanagement.service.AssetService;
import com.hexa.assetmanagement.service.EmployeeService;
import com.hexa.assetmanagement.service.ServiceRequestService;

@RestController
@RequestMapping("/api/servicerequest")
public class ServiceRequestController {
	@Autowired
    private ServiceRequestService serviceRequestService;
    
    @Autowired
    private EmployeeService employeeService;
    
    @Autowired
    private AssetService assetService;

    @PostMapping("/add/{employeeId}/{assetId}")
    public ServiceRequest addServiceRequest(
            @RequestBody ServiceRequest serviceRequest,
            @PathVariable int employeeId,
            @PathVariable int assetId) throws InvalidIdException {
        //get the employee by id to validate the id
        Employee employee = employeeService.getById(employeeId);
      //get the asset by id to validate the id
        Asset asset = assetService.getById(assetId);
        //add the employee and asset in the serviceRequest
        serviceRequest.setEmployee(employee);
        serviceRequest.setAsset(asset);
        return serviceRequestService.addServiceRequest(serviceRequest);
    }

    @GetMapping("/getbyid/{RequestId}")
    public ServiceRequest getById(@PathVariable int RequestId) throws InvalidIdException {
        return serviceRequestService.getById(RequestId);
    }

    @GetMapping("/getall")
    public List<ServiceRequest> getAll(@RequestParam int page, @RequestParam int size) {
    	//create a pageable object to store the page and size 
    	//and findall method get the pageable object
        Pageable pageable = PageRequest.of(page, size);
        return serviceRequestService.getAll(pageable);
    }
    
    @GetMapping("/bystatus")
    public List<ServiceRequest> filterByStatus(@RequestParam String status) {
    	return serviceRequestService.filterByStatus(status);
    }
    
    @GetMapping("/byEmployeeId")
    public List<ServiceRequest> filterByEmployeeId(@RequestParam int empId) 
    		throws InvalidIdException {
    	//check employee with id is present in db or not
    	employeeService.getById(empId);
    	return serviceRequestService.filterByEmployeeId(empId);
    }
    
    @GetMapping("/byAssetId")
    public List<ServiceRequest> filterByAssetId(@RequestParam int assetId) 
    		throws InvalidIdException {
    	//check asset with id is present in db or not
    	assetService.getById(assetId);
    	return serviceRequestService.filterByAssetId(assetId);
    }
}

