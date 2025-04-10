package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Admin;
import com.hexa.assetmanagement.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/add/{id}")
	public Admin add(@RequestBody Admin admin,
			@PathVariable int id) throws InvalidIdException, InvalidContactException {
		 return adminService.add(admin,id);
	}
	
	@GetMapping("/getall")
	public List<Admin> getall() {
		return adminService.getAll();
	}
	
	@GetMapping("/getbyid/{id}")
	public Admin getById(@PathVariable int id) throws InvalidIdException {
		return adminService.getById(id);
	}
	
	@PutMapping("/update/{id}")
	public Admin update(@RequestBody Admin admin,
			@PathVariable int id) throws InvalidIdException, InvalidContactException {
		return adminService.update(admin,id);
	}
}






