package com.hexa.assetmanagement.controller;
 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:5173/")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService; 
	@Autowired
	private EmployeeDto employeeDto;

	@PostMapping("/add-employee/{departId}") 
	//adding an employee - admin and employee has authority.
	public Employee addEmployee(@RequestBody Employee employee,@PathVariable int departId) throws InvalidIdException, InvalidContactException, UsernameInvalidException {
		return employeeService.addEmployee(employee,departId);
	}

	@GetMapping("/getbyid/{empId}")
	//getting an employee by his/her id.
	public Employee getById(@PathVariable int empId) throws InvalidIdException {
		return employeeService.getById(empId);
	}

	@GetMapping("/getall")
	//getting the list of employees -> admin and manager has authority for this.
	public EmployeeDto getAll(@RequestParam int page, @RequestParam int size) {
		Pageable pageable = PageRequest.of(page, size);
		 Page<Employee> employee = employeeService.getAll(pageable);
		 employeeDto.setCurrentPage(page);
		 employeeDto.setList(employee.getContent());
		 employeeDto.setSize(size);
		 employeeDto.setTotalElements((int)employee.getTotalElements());
		 employeeDto.setTotalPages(employee.getTotalPages());
			return employeeDto;
		 
	}

	@GetMapping("/getbyname")
	//filtering employees with their name
	public List<Employee> filterByName(@RequestParam String name) {
		return employeeService.filterByName(name);
	}

	@GetMapping("/getbydepartment")
	//filtering employees by their department
	public List<Employee> filterByDepartment(@RequestParam String department) {
		return employeeService.filterByDepartment(department);
	}
	
	@PutMapping("/update/{empId}")
	//updating employee with employee id
	public Employee updateEmployee(@RequestBody Employee newEmployee, @PathVariable int empId) throws InvalidIdException, InvalidContactException {
		Employee oldEmployee= employeeService.getById(empId);
		return employeeService.updateEmployee(oldEmployee, newEmployee );
	}
	
	@DeleteMapping("/delete/{empId}")
	public String deleteByEmployee(@PathVariable int empId) throws InvalidIdException {
		//check whether the employee id exists or not
		Employee employee=employeeService.getById(empId);
	 
		return employeeService.deleteByEmployee(employee);
	}
}
