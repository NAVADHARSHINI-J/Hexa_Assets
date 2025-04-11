package com.hexa.assetmanagement.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexa.assetmanagement.model.ServiceRequest;
import com.hexa.assetmanagement.repository.ServiceRequestRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class ServiceRequestServiceTest {

	@InjectMocks
	private ServiceRequestService serviceRequestService;
	@Mock
	private ServiceRequestRepository serviceRequestRepository;
	
	@BeforeEach
	public void init() {
		
	}
	
	@Test
	public void addServiceRequestTest() {
		
	}
}






