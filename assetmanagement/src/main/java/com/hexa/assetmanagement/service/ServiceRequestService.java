package com.hexa.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    public ServiceRequest addServiceRequest(ServiceRequest serviceRequest) {
    	if(serviceRequest.getRequestDate()==null)
    		serviceRequest.setRequestDate(LocalDate.now());
        return serviceRequestRepository.save(serviceRequest);
    }

    public ServiceRequest getById(int id) throws InvalidIdException {
        Optional<ServiceRequest> optional = serviceRequestRepository.findById(id);
        if (optional.isEmpty()) {
            throw new InvalidIdException("Service Request ID is invalid...");
        }
        return optional.get();
    }

    public List<ServiceRequest> getAll(Pageable pageable) {
        return serviceRequestRepository.findAll(pageable).getContent();
    }
}

