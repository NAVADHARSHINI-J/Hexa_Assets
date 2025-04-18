package com.hexa.assetmanagement.controller;

import java.io.IOException;
import java.security.Principal;
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
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/add/{assetId}")
    public ServiceRequest addServiceRequest(
            @RequestBody ServiceRequest serviceRequest,
            Principal principal,
            @PathVariable int assetId) throws InvalidIdException {
        //get the employee by using the useername
        Employee employee = employeeService.findByUsername(principal.getName());
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
    
    @DeleteMapping("/delete-assetid/{assetId}")
	public ResponseEntity<?> deleteByAssetId(@PathVariable int assetId) throws InvalidIdException {
		//delete all the service request by the given asset id
		String message =serviceRequestService.deleteByAssetId(assetId);
		return ResponseEntity.ok(message);
	}
	
	@DeleteMapping("/delete-empId/{empId}")
	public ResponseEntity<?> deleteByEmployeeId(@PathVariable int empId) 
			throws InvalidIdException {
		//delete all the service request by the given employee id
		String message =serviceRequestService.deleteByEmployeeId(empId);
		return ResponseEntity.ok(message);
	}
	
	@PutMapping("update/{requestId}")
	public ServiceRequest update(@RequestBody ServiceRequest request,
			@PathVariable int requestId) throws InvalidIdException {
		//update the service request
		return serviceRequestService.update(request,requestId);
	}
	
	@PostMapping("/image/upload/{requestId}")
 	public ServiceRequest uploadImage(@PathVariable int requestId, 
 				@RequestParam MultipartFile file) throws IOException, InvalidIdException {
 		return serviceRequestService.uploadImage(file,requestId);
 	}
}

