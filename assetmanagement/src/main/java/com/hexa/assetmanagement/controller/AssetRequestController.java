package com.hexa.assetmanagement.controller;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.AssetRequest;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.service.AssetRequestService;
import com.hexa.assetmanagement.service.AssetService;
import com.hexa.assetmanagement.service.EmployeeService;

@RestController
@RequestMapping("/api/assetrequest")
@CrossOrigin(origins = "http://localhost:5173/")
public class AssetRequestController {

	@Autowired
	private AssetRequestService assetRequestService;
	
	@Autowired
	private AssetService assetService;
	
	@Autowired
	private EmployeeService employeeService;

	/*
	 * adding a new request for an asset with asset id, using principal to get the username.
	 * passing the asset id, username and assetRequest reference to service 
	 */
	@PostMapping("/add/{assetId}")
	public AssetRequest addAssetRequest(@PathVariable int assetId, @RequestBody AssetRequest assetRequest,
			Principal principal) throws InvalidIdException {

		//fetching the username with principal.
		String username = principal.getName();
		return assetRequestService.addAssetRequest(assetId, username, assetRequest);
	}


	/*
	 * getting an asset request through it's id passed as pathVariable.
	*/
	@GetMapping("/get/{assetRequestId}")
	public AssetRequest getById(@PathVariable int assetRequestId) throws InvalidIdException {
		return assetRequestService.getById(assetRequestId);
	}

	/*
	 * getting the list of asset requests made.
	 */
	@GetMapping("/getall")
	public List<AssetRequest> getAllAssetRequest() {
		return assetRequestService.getAllAssetRequest();
	}

	/* 
	 * filtering the asset request with status passed as an request-param
	 */
	@GetMapping("/getbystatus")
	public List<AssetRequest> filterByStatus(@RequestParam String status) {
		return assetRequestService.filterByStatus(status);
	}

	/*
	 * filtering the list of asset request by employeeId passed as an pathVariable
	 */
	@GetMapping("/getbyempid/{empId}")
	public List<AssetRequest> filterByEmployeeId(@PathVariable int empId) throws InvalidIdException {
		return assetRequestService.filterByEmployeeId(empId);
	}

	/*
	 * filtering the list of asset request by asset id passed as an pathVariable.
	 */
	@GetMapping("/getbyassetid/{assetId}")
	public List<AssetRequest> filterByAssetId(@PathVariable int assetId) throws InvalidIdException {
		return assetRequestService.filterByAssetId(assetId);
	}

	/*
	 * filtering the list of asset request by request date passed as an request-param. 
	 */
	@GetMapping("/getbydate")
	public List<AssetRequest> filterByRequestDate(@RequestParam LocalDate RequestDate) {
		return assetRequestService.filterByRequestDate(RequestDate);
	}
	
	/*
	 * updating the status of the asset request with it's id passed as an pathVariable and status as requestparam 
	 */
	@PutMapping("/update-status/{assetRequestId}")
	public AssetRequest updateStatus(@RequestParam String status, @PathVariable int assetRequestId) throws InvalidIdException {
		return assetRequestService.updateStatus(status, assetRequestId);
	}
	
	/*
	 * delete the asset request by asset id passed as an pathVariable
	 */
	@DeleteMapping("/delete-by-asset/{assetId}")
	public String deleteAssetRequestByAsset(@PathVariable int assetId) throws InvalidIdException {
		Asset asset = assetService.getById(assetId);
		
		return assetRequestService.deleteAssetRequestByAsset(asset);
	}
	
	/*
	 * delete the asset request by employee id passed as an pathVariable
	 */
	@DeleteMapping("/delete-by-employee/{empId}")
	public String deleteAssetRequestByEmployee(@PathVariable int empId) throws InvalidIdException {
		Employee employee = employeeService.getById(empId);
		
		return assetRequestService.deleteAssetRequestByEmployee(employee);
	}

}
