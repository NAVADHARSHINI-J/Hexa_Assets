package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.ServiceRequest;
import com.hexa.assetmanagement.repository.ServiceRequestRepository;

@Service
public class ServiceRequestService {

	@Autowired
    private ServiceRequestRepository serviceRequestRepository;
	
	Logger logger = LoggerFactory.getLogger("ServiceRequestService");

    public ServiceRequest addServiceRequest(ServiceRequest serviceRequest) {
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

    public List<ServiceRequest> getAll(Pageable pageable) {
    	//get all the service request by using the findall method which takes the 
    	//pageable object to list it in a page manner 
    	logger.info("All Srevice request are retrieved");
        return serviceRequestRepository.findAll(pageable).getContent();
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
}

