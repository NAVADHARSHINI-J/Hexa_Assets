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

	/*
	 * getting the asset by it's id, getting employee by user[fetched by username]
	 * and setting it in asset request and saving it in repo.
	 */
	public AssetRequest addAssetRequest(int assetId, String username, AssetRequest assetRequest)
			throws InvalidIdException {

		// getting the asset by asset id.
		Asset asset = assetService.getById(assetId);
		// finding the user by username
		User user = userRepository.findByUsername(username);

		// setting the asset in asset request.
		assetRequest.setAsset(asset);

		// finding the employee with user, if not found then throw an exception
		Employee employee = employeeRepository.findByUser(user)
				.orElseThrow(() -> new InvalidIdException("Employee not found for user"));

		// setting the employee in asset request.
		assetRequest.setEmployee(employee);

		// if date is not provided then set it with current date
		if (assetRequest.getRequestDate() == null)
			assetRequest.setRequestDate(LocalDate.now());

		logger.info("Asset Request for " + asset.getName() + "is made");
		return assetRequestRepository.save(assetRequest);
	}

	/*
	 * with the passed assetRequestId check whether valid or not and then proceed.
	 */
	public AssetRequest getById(int assetRequestId) throws InvalidIdException {
		// check if the asset request is found or not.
		Optional<AssetRequest> optional = assetRequestRepository.findById(assetRequestId);
		// if not threw an exception.
		if (optional.isEmpty())
			throw new InvalidIdException("Asset Request Id is invalid");
		return optional.get();
	}

	/* return the list of requests */
	public List<AssetRequest> getAllAssetRequest() {
		return assetRequestRepository.findAll();
	}

	/* return the list of requests based on their status */
	public List<AssetRequest> filterByStatus(String status) {
		return assetRequestRepository.findByStatus(status);
	}

	/*
	 * returning the list of asset request made by a particular employee where the
	 * employee id being passed and got the employee reference with the employee
	 * reference finding the requests he/she made
	 */
	public List<AssetRequest> filterByEmployeeId(int empId) throws InvalidIdException {
		Employee employee = employeeService.getById(empId);
		// returning the list requests made by a particular employee with his/her id.
		return assetRequestRepository.findByEmployee(employee);
	}

	/*
	 * returning the list of asset request made for a particular asset as the asset
	 * id being passed and the reference of asset got by the asset id and then
	 * finding the asset requests made with this particular asset.
	 */
	public List<AssetRequest> filterByAssetId(int assetId) throws InvalidIdException {
		Asset asset = assetService.getById(assetId);
		// returning the list of asset requests made for a particular asset with it's
		// id.
		return assetRequestRepository.findByAsset(asset);
	}

	/*
	 * returning the list of asset request made based on their request date
	 */
	public List<AssetRequest> filterByRequestDate(LocalDate RequestDate) {
		return assetRequestRepository.findByRequestDate(RequestDate);
	}

	/*
	 * updating the status of an asset where the status and asset request id is
	 * being passed asset request reference if fetched by it's id and set the asset
	 * status and save it in repo
	 */
	public AssetRequest updateStatus(String status, int assetRequestId) throws InvalidIdException {
		// updating the status of the asset request such as approved or declined through
		// it's id.
		AssetRequest assetRequest = getById(assetRequestId);
		if (status != null)
			assetRequest.setStatus(status);
		logger.info("Status updated to {} for AssetRequest {}", status, assetRequest.getAsset().getName());
		return assetRequestRepository.save(assetRequest);
	}

	/*
	 * deleting the list of asset request made with a particular asset fetch the
	 * list of asset request with that asset and delete all of them.
	 */
	public String deleteAssetRequestByAsset(Asset asset) {
		// deleting the asset request made, with asset.
		List<AssetRequest> list = assetRequestRepository.findByAsset(asset);
		logger.info("Asset Request for {} deleted successfully!", asset.getName());
		assetRequestRepository.deleteAll(list);
		return "Asset request using asset id deleted successfully";
	}

	/*
	 * deleting an asset request made by a particular employee where employee
	 * reference being passed and fetching the list of asset request with that
	 * particular employee reference and deleting them all
	 */
	public String deleteAssetRequestByEmployee(Employee employee) {
		// deleting the asset request made, with employee.
		List<AssetRequest> list = assetRequestRepository.findByEmployee(employee);
		logger.info("Asset Request for {} deleted successfully!", employee.getName());
		assetRequestRepository.deleteAll(list);
		return "Asset request using employee id deleted successfully";
	}

}
