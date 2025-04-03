package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Department;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.service.DepartmentService;
import com.hexa.assetmanagement.service.EmployeeService;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private DepartmentService departmentService;
	
	@PostMapping("/add/{id}")
	public Employee addEmployee(@RequestBody Employee employee,
			@PathVariable int id) throws InvalidIdException, InvalidContactException {
		Department department= departmentService.getById(id);
		employee.setDepartment(department);
		return employeeService.addEmployee(employee);
	}
	
	@GetMapping("/getbyid/{id}")
	public Employee getById(@PathVariable int id) throws InvalidIdException {
		return employeeService.getById(id);
	}
	
	@GetMapping("/getall")
	public List<Employee> getAll(@RequestParam int page,@RequestParam int size) {
		Pageable pageable= PageRequest.of(page, size);
		return employeeService.getAll(pageable);
	}
}
