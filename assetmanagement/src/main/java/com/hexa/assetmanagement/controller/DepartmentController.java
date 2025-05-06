package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Department;
import com.hexa.assetmanagement.service.DepartmentService;

@RestController
@RequestMapping("/api/department")
//@CrossOrigin(origins = "http://localhost:5173/")
public class DepartmentController {
	@Autowired
	private DepartmentService departmentService;
	
	/*
	 * adding a new department by getting the department reference thru request body 
	 */
	@PostMapping("/add")
	public Department addDepartment(@RequestBody Department department) {
		//passing the department reference to the service.
		return departmentService.addDepartment(department);
	}

	/*
	 * getting a particular department with it's id. 
	 */
	@GetMapping("/getbyid/{departmentId}")
	public Department getById(@PathVariable int departmentId) throws InvalidIdException {
		// passing the department id to service.
		return departmentService.getById(departmentId);
	}
	
	/*
	 * getting the list of departments 
	 */
	@GetMapping("/getall")
	public List<Department> getAll(){ 
		return departmentService.getAll();
	}
}
