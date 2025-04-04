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
@RequestMapping("/api/servicereq")
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
        
        Employee employee = employeeService.getById(employeeId);
        Asset asset = assetService.getById(assetId);
        
        serviceRequest.setEmployee(employee);
        serviceRequest.setAsset(asset);
        return serviceRequestService.addServiceRequest(serviceRequest);
    }

    @GetMapping("/getbyid/{id}")
    public ServiceRequest getById(@PathVariable int id) throws InvalidIdException {
        return serviceRequestService.getById(id);
    }

    @GetMapping("/getall")
    public List<ServiceRequest> getAll(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return serviceRequestService.getAll(pageable);
    }
}

