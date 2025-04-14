package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.AssetRequest;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.repository.AssetRequestRepository;
import com.hexa.assetmanagement.repository.EmployeeRepository;
import com.hexa.assetmanagement.repository.UserRepository;

@Service
public class AssetRequestService {

	@Autowired
	private AssetService assetService;

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private AssetRequestRepository assetRequestRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmployeeService employeeService;

	Logger logger = LoggerFactory.getLogger("AssetRequestService");

//	public AssetRequest addAssetRequest(int assetId, String username, AssetRequest assetRequest)
//			throws InvalidIdException {
//
//		Asset asset = assetService.getById(assetId);
//		// finding the user by username
//		User user = userRepository.findByUsername(username);
//		assetRequest.setUser(user);
//		assetRequest.setAsset(asset);
//
//		// finding the employee with user, if not found threw an exception
//		Employee employee = employeeRepository.findByUser(user)
//				.orElseThrow(() -> new InvalidIdException("Employee not found for user"));
//
//		assetRequest.setEmployee(employee);
//
//		// if date is not provided then set it with current date
//		if (assetRequest.getRequestDate() == null)
//			assetRequest.setRequestDate(LocalDate.now());
//
//		logger.info("Asset Request for " + asset.getName() + "is made");
//		return assetRequestRepository.save(assetRequest);
//	}

	public AssetRequest getById(int assetRequestId) throws InvalidIdException {
		Optional<AssetRequest> optional = assetRequestRepository.findById(assetRequestId);
		if (optional.isEmpty())
			throw new InvalidIdException("Asset Request Id is invalid");
		return optional.get();
	}

	public List<AssetRequest> getAllAssetRequest() {
		return assetRequestRepository.findAll();
	}

	public List<AssetRequest> filterByStatus(String status) {
		return assetRequestRepository.findByStatus(status);
	}

	public List<AssetRequest> filterByEmployeeId(int empId) throws InvalidIdException {
		Employee employee = employeeService.getById(empId);
		return assetRequestRepository.findByEmployee(employee);
	}

	public List<AssetRequest> filterByAssetId(int assetId) throws InvalidIdException {
		Asset asset = assetService.getById(assetId);
		return assetRequestRepository.findByAsset(asset);
	}

	public List<AssetRequest> filterByRequestDate(LocalDate RequestDate) {
		return assetRequestRepository.findByRequestDate(RequestDate);
	}

	public AssetRequest updateStatus(String status, int assetRequestId) throws InvalidIdException { 
		AssetRequest assetRequest = getById(assetRequestId);
		if(status != null) 
			assetRequest.setStatus(status);
		logger.info("Status updated to {} for AssetRequest {}", status, assetRequest.getAsset().getName());
		return assetRequestRepository.save(assetRequest);
	}

	public String deleteAssetRequestByAsset(Asset asset) { 
		
		List<AssetRequest> list = assetRequestRepository.findByAsset(asset);
		logger.info("Asset Request for {} deleted successfully!", asset.getName());
		assetRequestRepository.deleteAll(list);
		return "Asset request using asset id deleted successfully";
	}

	public String deleteAssetRequestByEmployee(Employee employee) { 
		
		List<AssetRequest> list =assetRequestRepository.findByEmployee(employee);
		logger.info("Asset Request for {} deleted successfully!", employee.getName());
		assetRequestRepository.deleteAll(list);
		return "Asset request using employee id deleted successfully";
	}

}
