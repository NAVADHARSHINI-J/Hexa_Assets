package com.hexa.assetmanagement.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Asset;
import com.hexa.assetmanagement.model.AssetRequest;
import com.hexa.assetmanagement.model.Category;
import com.hexa.assetmanagement.model.Department;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.repository.AssetRequestRepository;
import com.hexa.assetmanagement.repository.EmployeeRepository;
import com.hexa.assetmanagement.repository.UserRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class AssetRequestServiceTest {

	@Mock
	private AssetRequestRepository assetRequestRepository;

	@InjectMocks
	   private AssetRequestService assetRequestService;
	
	@Mock
	private AssetService assetService; 
	
	@Mock
	private UserRepository userRepository;
	
	@Mock
	private EmployeeRepository employeeRepository;


	AssetRequest as1;
	AssetRequest as2;

	@BeforeEach
	public void gitint() {
		as1 = new AssetRequest(1, LocalDate.of(2024, 12, 11), "for new project", "approved",
				new Employee(1, "sheryl", "sheryl@gmail.com", "9076234187", "no.22, 4th street",
						new Department(1, "IT"), new User(1, "sheryl", "1234", "EMPLOYEE")),
				new Asset(1, "msi laptop", "modern 14", "available", LocalDate.of(2024, 12, 11), "16gb ram", "good product", 4,
						new Category(1, "laptop")));
		
		as2 = new AssetRequest(2, LocalDate.of(2024, 04, 10), "for personal use", "declined",
				new Employee(2, "nava", "nava@gmail.com", "8025671893", "no.32, 5th street", new Department(2, "FINANCE"),
						new User(2, "nava", "1234", "EMPLOYEE")),
				new Asset(2, " panasonic", "new model", "available", LocalDate.of(2024, 04, 10), "andriod tv", "good product", 6,
						new Category(2, "television")));
		
		try {
			when(assetService.getById(1)).thenReturn(as1.getAsset());
		} catch (InvalidIdException e)  {
		}
		when(userRepository.findByUsername("sheryl")).thenReturn(as1.getEmployee().getUser());
		when(employeeRepository.findByUser(as1.getEmployee().getUser())).thenReturn(Optional.of(as1.getEmployee()));
		when(assetRequestRepository.save(as1)).thenReturn(as1);
	}
	
	@Test
	public void addAssetRequest() {
		
		//case 1: checking for getting correct output.
		 
		try {
			assertEquals(as1, assetRequestService.addAssetRequest(1, "sheryl", as1));
		} catch (InvalidIdException e) { 
		}
		
		//case 2: checking for incorrect output.
		
		try {
			assertNotEquals(as2, assetRequestService.addAssetRequest(1, "sheryl", as1));
		} catch (InvalidIdException e) {  
		}
		
		//case 3: check if getById returns correct output.
		
		try {
			assertEquals(as1.getAsset(), assetService.getById(1));
		} catch (InvalidIdException e) { 
		}
		
		//case 4: check if getById returns incorrect output
		//And throws InvalidIdException.
		
		try {
			assertNotEquals(as2.getAsset(), assetService.getById(1));
		} catch (InvalidIdException e) { 
			assertEquals("Asset Id is invalid....", e.getMessage());
		}
		
		//case 5: check if findByUsername gets correct output.
		
		assertEquals(as1.getEmployee().getUser(), userRepository.findByUsername("sheryl"));
		
		//case 6: intentionally passing different username.
		
		assertNotEquals(as1.getEmployee().getUser(), userRepository.findByUsername("nava"));
		
		//case 7:check if getting employee by user
		
		assertEquals(as1.getEmployee(), 
				employeeRepository.findByUser(as1.getEmployee().getUser()).get());
													// .get() because it returns an optional.
		
		//case 8: intentionally expecting other employee details by passing a different user.
		assertNotEquals(as2.getEmployee(), 
				employeeRepository.findByUser(as1.getEmployee().getUser()).get());
		
		verify(assetRequestRepository, times(2)).save(as1);
		
	}
}
