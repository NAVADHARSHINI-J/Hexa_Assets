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
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.LiquidAsset;
import com.hexa.assetmanagement.model.LiquidAssetAllocation;
import com.hexa.assetmanagement.repository.LiquidAssetAllocationRepository;

@Service
public class LiquidAssetAllocationService {

	@Autowired
    private LiquidAssetAllocationRepository liquidAssetAllocationRepository;
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private LiquidAssetService liquidAssetService;
	
	Logger logger = LoggerFactory.getLogger("LiquidAssetAllocation");

    public LiquidAssetAllocation addLiquidAssetAllocation(LiquidAssetAllocation allocation) {
    	//check whether allocated date is null or not if yes set today's date
    	if(allocation.getAllocatedDate()==null) {
    		allocation.setAllocatedDate(LocalDate.now());
    	logger.info("Allocation date was null. Set to current date: " + allocation.getAllocatedDate());
    	}
    	//Save the LiquidAssetAllocation entity to the database
    	LiquidAssetAllocation saved = liquidAssetAllocationRepository.save(allocation);
    		 logger.info("New LiquidAssetAllocation added with ID: " +saved.getId());
        return liquidAssetAllocationRepository.save(allocation);
    }

    public LiquidAssetAllocation getById(int id) throws InvalidIdException {
        Optional<LiquidAssetAllocation> optional = liquidAssetAllocationRepository.findById(id);
        //check if the id is present or not
        if (optional.isEmpty()) {
            throw new InvalidIdException("Liquid Asset Allocation ID is invalid...");
        } //get liquid asset by the id
        logger.info("LiquidAssetAllocation fetched with ID: " + id);
        return optional.get();
    }

    public List<LiquidAssetAllocation> getAll(Pageable pageable) {
    	//get the liquid assets allocated in the page format
    	 logger.info("Fetched liquid asset allocations");
        return liquidAssetAllocationRepository.findAll(pageable).getContent();
    }
    
		public List<LiquidAssetAllocation> getLiquidAssetByEmployeeId(int employeeId) throws InvalidIdException {
		    // Check if the employee exists
		    Employee employee = employeeService.getById(employeeId);
		    // Get all allocations by employee
		    logger.info("Found allocations for employee ID: " + employeeId);
		    return liquidAssetAllocationRepository.findByEmployee(employee);
		}

		public List<Employee> getEmployeesByLiquidAssetId(int liquidAssetId) throws InvalidIdException {
		    // Check if the liquid asset exists
		    LiquidAsset asset = liquidAssetService.getById(liquidAssetId);
		    // Get all allocations for that asset
		    List<LiquidAssetAllocation> allocations = liquidAssetAllocationRepository.findByLiquidAsset(asset);
		    // Extract unique employees from allocations
		    logger.info("Found employees for liquid asset ID: " + liquidAssetId);
		    return allocations.stream()
		                      .map(LiquidAssetAllocation::getEmployee)
		                      .distinct()
		                      .toList();
		}
		
		public String deleteByLiquidAssetId(int id) throws InvalidIdException {
		    //get the liquid asset using id
		    LiquidAsset asset = liquidAssetService.getById(id); 
            // retrieve all allocations linked to the given liquid asset.
		    List<LiquidAssetAllocation> del = liquidAssetAllocationRepository.findByLiquidAsset(asset);
            // delete all retrieved allocations
		    liquidAssetAllocationRepository.deleteAll(del);
		    logger.info("Deleted " + del.size() + " allocations for LiquidAsset ID: " + id);
		    return "All allocations deleted successfully.";
		}

		public String deleteByEmployeeId(int employeeId) throws InvalidIdException {
		    //get the employee using the id
		    Employee employee = employeeService.getById(employeeId);
             // Retrieve all allocations linked to this employee
		    List<LiquidAssetAllocation> allocationsToDelete = liquidAssetAllocationRepository.findAll()
		            .stream()
		            .filter(a -> a.getEmployee().getId() == employee.getId())
		            .toList();
		    // delete all found allocations
		    liquidAssetAllocationRepository.deleteAll(allocationsToDelete);
		    logger.info("Liquid asset allocations for employee ID " + employee.getId() + " deleted successfully.");
		    return "Liquid asset allocations for employee ID " + employee.getId() + " deleted successfully.";
		}


}
