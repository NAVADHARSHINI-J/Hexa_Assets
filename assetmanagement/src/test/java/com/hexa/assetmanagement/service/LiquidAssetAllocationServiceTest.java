package com.hexa.assetmanagement.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexa.assetmanagement.exception.AssetUnavailableException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.LiquidAsset;
import com.hexa.assetmanagement.model.LiquidAssetAllocation;
import com.hexa.assetmanagement.repository.LiquidAssetAllocationRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class LiquidAssetAllocationServiceTest {

    @Mock
    private LiquidAssetAllocationRepository liquidAssetAllocationRepository;

    @Mock
    private EmployeeService employeeService;

    @Mock
    private LiquidAssetService liquidAssetService;

    @InjectMocks
    private LiquidAssetAllocationService liquidAssetAllocationService;

    private LiquidAsset a1, a2;
    private Employee e1, e2;
    private LiquidAssetAllocation aa1, aa2, aa3;

    @BeforeEach
    public void init() {
        a1 = new LiquidAsset(1, "liquidAsset1", 10600.0, 1200.0, "liquid asset 1", "Active");
        a2 = new LiquidAsset(2, "liquidAsset2", 500000.0,1200.0,"liquid asset 2","Pending");
        e1 = new Employee(1, "employee1", "employee1@gmail.com", "9344908756", "Chennai", "IT");
        e2 = new Employee(2, "employee2", "employee2@gmail.com", "6598908756", "Mumbai","HR");
        aa1 = new LiquidAssetAllocation(1, LocalDate.of(2024, 4, 1), 1000.0, e1, a1);
        aa2 = new LiquidAssetAllocation(2, LocalDate.of(2024, 4, 5), 2500.0, e2, a2);
        aa3 = new LiquidAssetAllocation(3, LocalDate.of(2024, 4, 10), 3000.0, e1, a2);
    }

    @Test
    public void addLiquidAssetAllocationTest() throws InvalidIdException, AssetUnavailableException {
        // Setup valid LiquidAssets and Employees
        when(liquidAssetService.getById(1)).thenReturn(a1);
        when(employeeService.getById(1)).thenReturn(e1);
        when(liquidAssetService.getById(2)).thenReturn(a2);
        when(employeeService.getById(2)).thenReturn(e2);

        // Use case 1: Correct output
        when(liquidAssetAllocationRepository.save(aa1)).thenReturn(aa1);
        LiquidAssetAllocation actual = liquidAssetAllocationService.add(1, 1, aa1);

        assertEquals(aa1, actual);
        assertEquals(1, actual.getEmployee().getId());
        assertEquals(1, actual.getLiquidAsset().getId());

        // Use case 2: Check default allocation date when it's null
        aa2.setAllocatedDate(null);
        when(liquidAssetAllocationRepository.save(any(LiquidAssetAllocation.class)))
                .thenAnswer(invocation -> {
                    LiquidAssetAllocation allocation = invocation.getArgument(0);
                    // Simulate the service setting the date
                    if (allocation.getAllocatedDate() == null) {
                        allocation.setAllocatedDate(LocalDate.now());
                    }
                    return allocation;
                });

        actual = liquidAssetAllocationService.add(2, 2, aa2);
        assertEquals(LocalDate.now(), actual.getAllocatedDate());

        // Use case 3: Insufficient asset amount
        a2.setRemainingAmount(100.0);  // make available amount less than allocation amount
        try {
            actual = liquidAssetAllocationService.add(2, 2, aa3);  // assuming aa3.amount > 100
            fail("Expected AssetUnavailableException was not thrown");
        } catch (AssetUnavailableException e) {
            assertEquals("Insufficient liquid asset amount.", e.getMessage());
        }

        // Use case 4: Asset not available (total amount is 0)
        a2.setTotalAmount(0.0);
        a2.setRemainingAmount(0.0);
        try {
            actual = liquidAssetAllocationService.add(2, 1, aa2);
            fail("Expected AssetUnavailableException was not thrown");
        } catch (AssetUnavailableException e) {
            assertEquals("Liquid asset is not available for allocation.", e.getMessage());
        }

        // Use case 5: Invalid LiquidAsset ID
        when(liquidAssetService.getById(5)).thenThrow(new InvalidIdException("Liquid Asset Id is invalid..."));
        try {
            actual = liquidAssetAllocationService.add(5, 1, aa2);
            fail("Expected InvalidIdException was not thrown");
        } catch (InvalidIdException e) {
            assertEquals("Liquid Asset Id is invalid...", e.getMessage());
        }

        // Use case 6: Invalid Employee ID
        when(employeeService.getById(5)).thenThrow(new InvalidIdException("Employee Id is invalid..."));
        try {
            actual = liquidAssetAllocationService.add(1, 5, aa2);
            fail("Expected InvalidIdException was not thrown");
        } catch (InvalidIdException e) {
            assertEquals("Employee Id is invalid...", e.getMessage());
        }
    }


    @Test
    public void getByIdTest() {
        // Use case 1: Correct output
        when(liquidAssetAllocationRepository.findById(1)).thenReturn(Optional.of(aa1));
        try {
            assertEquals(aa1, liquidAssetAllocationService.getById(1));
        } catch (InvalidIdException e) { }

        // Use case 2: Invalid ID
        try {
            assertEquals(aa1, liquidAssetAllocationService.getById(10));
        } catch (InvalidIdException e) {
            assertEquals("Liquid Asset Allocation ID is invalid...", e.getMessage());
        }

        // Use case 3: Wrong output
        try {
            assertNotEquals(aa2, liquidAssetAllocationService.getById(1));
        } catch (InvalidIdException e) { }
    }

    @Test
    public void getLiquidAssetByEmployeeIdTest() throws InvalidIdException {
        // Use case 1: Correct output
        when(employeeService.getById(1)).thenReturn(e1);
        when(liquidAssetAllocationRepository.findByEmployee(e1)).thenReturn(Arrays.asList(aa1, aa2));
        List<LiquidAssetAllocation> allocations = liquidAssetAllocationService.getLiquidAssetByEmployeeId(1);
        assertEquals(2, allocations.size());

        // Use case 2: Invalid Employee ID
        try {
            when(employeeService.getById(10)).thenThrow(new InvalidIdException("Employee Id is invalid..."));
            liquidAssetAllocationService.getLiquidAssetByEmployeeId(10);
        } catch (InvalidIdException e) {
            assertEquals("Employee Id is invalid...", e.getMessage());
        }
    }

    @Test
    public void deleteByLiquidAssetIdTest() throws InvalidIdException {
        // Use case 1: Correct output
        when(liquidAssetService.getById(1)).thenReturn(a1);
        when(liquidAssetAllocationRepository.findByLiquidAsset(a1)).thenReturn(Arrays.asList(aa1, aa2));

        String result = liquidAssetAllocationService.deleteByLiquidAssetId(1);
        assertEquals("All allocations deleted successfully.", result);

        // Use case 2: Invalid Liquid Asset ID
        try {
            when(liquidAssetService.getById(10)).thenThrow(new InvalidIdException("Liquid Asset Id is invalid..."));
            liquidAssetAllocationService.deleteByLiquidAssetId(10);
        } catch (InvalidIdException e) {
            assertEquals("Liquid Asset Id is invalid...", e.getMessage());
        }
    }

    @Test
    public void getEmployeesByLiquidAssetIdTest() throws InvalidIdException {
        // Use case 1: Correct output
        when(liquidAssetService.getById(1)).thenReturn(a1);
        when(liquidAssetAllocationRepository.findByLiquidAsset(a1)).thenReturn(Arrays.asList(aa1, aa2));

        List<Employee> employees = liquidAssetAllocationService.getEmployeesByLiquidAssetId(1);
        assertEquals(1, employees.size());

        // Use case 2: Invalid Liquid Asset ID
        try {
            when(liquidAssetService.getById(10)).thenThrow(new InvalidIdException("Liquid Asset Id is invalid..."));
            liquidAssetAllocationService.getEmployeesByLiquidAssetId(10);
        } catch (InvalidIdException e) {
            assertEquals("Liquid Asset Id is invalid...", e.getMessage());
        }
    }
}
