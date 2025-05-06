package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.dto.EmployeeDto;
import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.exception.UsernameInvalidException;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.service.EmployeeService;
import com.hexa.assetmanagement.service.ServiceRequestService;

@RestController
@RequestMapping("/api/employee")
//@CrossOrigin(origins = "http://localhost:5173/")
public class EmployeeController {

	@Autowired
	private EmployeeDto employeeDto;
	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private ServiceRequestService serviceRequestService;

	@Autowired
	private AssetRequestController assetRequestController;

	@Autowired
	private AssetAllocationController assetAllocationController;

	@Autowired
	private LiquidAssetRequestController liquidAssetRequestController;

	@Autowired
	private LiquidAssetAllocationController liquidAssetAllocationController;

	/*
	 * adding an employee by department id employee sign-up information is passed
	 * here as an employee object along with department id. the employee object and
	 * department id is passed to employee service.
	 */
	@PostMapping("/add-employee/{departId}")
	public Employee addEmployee(@RequestBody Employee employee, @PathVariable int departId)
			throws InvalidIdException, InvalidContactException, UsernameInvalidException {
		return employeeService.addEmployee(employee, departId);
	}

	/*
	 * getting an employee by his/her id. passing it to the service
	 */
	@GetMapping("/getbyid/{empId}")
	public Employee getById(@PathVariable int empId) throws InvalidIdException {
		return employeeService.getById(empId);
	}

	/*
	 * getting the list of employees -> admin and manager has authority for this.
	 * passing the page and size as the request param and created an employee dto to
	 * handle more easily getting the page of employee by using getall thru employee
	 * service setting the employee Dto with necessary setters such as current page,
	 * list, size, total elements, total pages.
	 */
	@GetMapping("/getall")
	public EmployeeDto getAll(@RequestParam int page, @RequestParam int size) {

		Pageable pageable = PageRequest.of(page, size);
		Page<Employee> employee = employeeService.getAll(pageable);
		employeeDto.setCurrentPage(page);
		employeeDto.setList(employee.getContent());
		employeeDto.setSize(size);
		employeeDto.setTotalElements((int) employee.getTotalElements());
		employeeDto.setTotalPages(employee.getTotalPages());
		return employeeDto;

	}

	/*
	 * filtering employees with their name returning as list
	 */
	@GetMapping("/getbyname")
	public List<Employee> filterByName(@RequestParam String name) {
		return employeeService.filterByName(name);
	}

	/*
	 * filtering employees by their department as page of employee return thru employee dto 
	 */
	@GetMapping("/getbydepartment")
	public EmployeeDto filterByDepartment(@RequestParam String department, @RequestParam int page,
			@RequestParam int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Employee> employee = employeeService.filterByDepartment(department, pageable);
		employeeDto.setCurrentPage(page);
		employeeDto.setList(employee.getContent());
		employeeDto.setSize(size);
		employeeDto.setTotalElements((int) employee.getTotalElements());
		employeeDto.setTotalPages(employee.getTotalPages());
		return employeeDto;
	}

	/*
	 * filtering employee by their user id 
	 */
	@GetMapping("/getbyuser/{userId}")
	public Employee filterByUser(@PathVariable int userId) throws InvalidIdException {
		return employeeService.filterByUser(userId);
	}

	/*
	  updating employee with employee id, receiving the new employee details by employee reference as request body.
	  retrieving the old employee details with the employee id and passing both old and new employee reference to service.
	 */
	@PutMapping("/update/{empId}")
	public Employee updateEmployee(@RequestBody Employee newEmployee, @PathVariable int empId)
			throws InvalidIdException, InvalidContactException {
		Employee oldEmployee = employeeService.getById(empId);
		return employeeService.updateEmployee(oldEmployee, newEmployee);
	}

	/*
	 * deleting an employee with his/her id.
	 * as employee being a fk in other classes such as, assetRequest, assetAllocation,
	 * liquidAssetRequest, liquidAssetAllocation and serviceRequest.
	 */
	@DeleteMapping("/delete/{empId}")
	public String deleteByEmployee(@PathVariable int empId) throws InvalidIdException {
		// check whether the employee id exists or not
		Employee employee = employeeService.getById(empId);
		// before deleting an employee delete the employee being fk in other models.
		// deleting in liquid asset request
		liquidAssetRequestController.deleteRequestsByEmployeeId(employee.getId());
		// deleting in liquid asset allocation
		liquidAssetAllocationController.deleteByEmployeeId(employee.getId());
		// deleting in service request
		serviceRequestService.deleteByEmployeeId(employee.getId());
		// deleting in asset request
		assetRequestController.deleteAssetRequestByEmployee(employee.getId());
		// deleting in asset allocation
		assetAllocationController.deleteByEmployeeId(employee.getId());
		return employeeService.deleteByEmployee(employee);
	}
	 
	/*
	 * finding an employee by his/her username.
	 * getting the username as a string thru request-param 
	 */
	@GetMapping("/findbyuser")
	public Employee findByUsername(@RequestParam String username) {
		return employeeService.findByUsername(username);
	}
 
	//get the size of the employee
	@GetMapping("/getEmpSize")
	public int getEmployeeSize() {
		return employeeService.getEmployeeSize();
  }
}
