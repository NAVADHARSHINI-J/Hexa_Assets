package com.hexa.assetmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
public class DepartmentController {
	@Autowired
	private DepartmentService departmentService;
	
	@PostMapping("/add")
	public Department addDepartment(@RequestBody Department department) {
		return departmentService.addDepartment(department);
	}
	@GetMapping("/getbyid/{id}")
	public Department getById(@PathVariable int id) throws InvalidIdException {
		return departmentService.getById(id);
	}
}
