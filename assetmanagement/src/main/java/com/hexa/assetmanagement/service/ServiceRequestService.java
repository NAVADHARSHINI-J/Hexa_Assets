package com.hexa.assetmanagement.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.ServiceRequest;
import com.hexa.assetmanagement.repository.ServiceRequestRepository;

@Service
public class ServiceRequestService {

	@Autowired
    private ServiceRequestRepository serviceRequestRepository;
	@Autowired
	private AssetService assetService;
	@Autowired
	private EmployeeService employeeService;
	
	Logger logger = LoggerFactory.getLogger("ServiceRequestService");

    public ServiceRequest addServiceRequest(ServiceRequest serviceRequest, String username, int assetId) throws InvalidIdException {
    	 //get the employee by using the useername
        Employee employee = employeeService.findByUsername(username);
      //get the asset by id to validate the id
        Asset asset = assetService.getById(assetId);
        //add the employee and asset in the serviceRequest
        serviceRequest.setEmployee(employee);
        serviceRequest.setAsset(asset);
    	//check whether the request date is present are not if not
//    	set the request date with the present date
    	if(serviceRequest.getRequestDate()==null)
    		serviceRequest.setRequestDate(LocalDate.now());
    	logger.info("Service request is added for asset "+serviceRequest.getAsset().getName());
        return serviceRequestRepository.save(serviceRequest);
    }

    public ServiceRequest getById(int RequestId) throws InvalidIdException {
    	//check whether the id is present in the db or not 
        Optional<ServiceRequest> optional = serviceRequestRepository.findById(RequestId);
        if (optional.isEmpty()) {
            throw new InvalidIdException("Service Request ID is invalid...");
        }
        logger.info("Service Request is found with id "+optional.get().getId());
        //if optional is not empty get the service request from the optional
        return optional.get();
    }

    public List<ServiceRequest> getAll() {
    	//get all the service request by using the findall method which takes the 
    	//pageable object to list it in a page manner 
    	logger.info("All Service request are retrieved");
        return serviceRequestRepository.findAll();
    }

	public List<ServiceRequest> filterByStatus(String status) {
		logger.info("Service Request is filtered by status");
		//filter the service request by status
		return serviceRequestRepository.findByStatus(status);
	}

	public List<ServiceRequest> filterByEmployeeId(int empId) {
		logger.info("Service Request is filtered by Employee Id "+empId);
		//filter the service request by employee id
		return serviceRequestRepository.findByEmployeeId(empId);
	}

	public List<ServiceRequest> filterByAssetId(int assetId) {
		logger.info("Service Request is filtered by Asset Id "+assetId);
		//filter the service request by asset id
		return serviceRequestRepository.findByAssetId(assetId);
	}

	public String deleteByAssetId(int assetId)
			throws InvalidIdException {
		//check that the asset id is found or not
		Asset asset=assetService.getById(assetId);
		//find all the service request with this asset
		List<ServiceRequest> list=serviceRequestRepository.findAll().stream()
		.filter(a->a.getAsset().getId()==asset.getId()).toList();
		//delete the service request
		serviceRequestRepository.deleteAll(list);
		logger.info("Service request with asset Id "+asset.getId()+" is deleted");
		return "Service request is deleted successfully";
	}

	public String deleteByEmployeeId(int empId) throws InvalidIdException {
		//check that the employee with id is found or not
		Employee employee=employeeService.getById(empId);
		//find all the service request with this Employee id
		List<ServiceRequest> list=serviceRequestRepository.findAll().stream()
				.filter(a->a.getEmployee().getId()==employee.getId()).toList();
		//delete the service request
		serviceRequestRepository.deleteAll(list);
		logger.info("Service request with employee Id "+employee.getId()+" is deleted");
		return "Service request is deleted successfully";
	}

	public ServiceRequest update(ServiceRequest request, int requestId)
			throws InvalidIdException {
		//check whether the service request is found with id
		ServiceRequest request1=getById(requestId);
		//check the request date
		if(request.getRequestDate()!=null)
			request1.setRequestDate(request.getRequestDate());
		//check the reason
		if(request.getReason()!=null)
			request1.setReason(request.getReason());
		//check the image url
		if(request.getImageUrl() != null) 
			request1.setImageUrl(request.getImageUrl());
		//check the status
		if(request.getStatus()!=null) 
			request1.setStatus(request.getStatus());
		logger.info("service request is updated successfully with id "+request1.getId());
		//save the service request
		return serviceRequestRepository.save(request1);
	}

	public ServiceRequest uploadImage(MultipartFile file, int requestId)
			throws IOException, InvalidIdException {
		/*check if request id isvalid */
		ServiceRequest serviceRequest = getById(requestId);	
 		List<String> allowedExtensions = Arrays.asList("png","jpg","jpeg","gif","svg"); 
 		String originalFileName = file.getOriginalFilename(); 
 		String extension= originalFileName.split("\\.")[1];
 		/*Check weather extension is allowed or not */
 		if( !(allowedExtensions.contains(extension))) {
 			throw new RuntimeException("Image Type Invalid");
 		}
 		
 		String uploadPath= "E:\\SpringBoot Projects\\assetmanagement\\uploads";
 		
 		/*Create directory *///Check if directory is present else create it
 		Files.createDirectories(Paths.get(uploadPath));
 		/*Define full path with folder and image name */
 		Path path = Paths.get(uploadPath + "\\" +originalFileName); 
 		/*Copy the image into uploads path */
 		Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
 		/*Save this path in Db */
 		serviceRequest.setImageUrl(path.toString());
 		logger.info("image is added successfully");
 		return serviceRequestRepository.save(serviceRequest);
	}
}






