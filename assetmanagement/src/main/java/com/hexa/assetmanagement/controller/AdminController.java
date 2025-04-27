package com.hexa.assetmanagement.controller;

import java.security.Principal;
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
	
	@PostMapping("/add")
	public Admin add(@RequestBody Admin admin,
			Principal principal) throws InvalidContactException {
		//get the user name by using the principal
		 String username=principal.getName();
		 return adminService.add(admin,username);
	}
	
	@GetMapping("/getall")
	public List<Admin> getall() {
		return adminService.getAll();
	}
	
	@GetMapping("/getbyid/{AdminId}")
	public Admin getById(@PathVariable int AdminId) throws InvalidIdException {
		return adminService.getById(AdminId);
	}
	
	@PutMapping("/update/{AdminId}")
	public Admin update(@RequestBody Admin admin,
			@PathVariable int AdminId) throws InvalidIdException, InvalidContactException {
		return adminService.update(admin,AdminId);
	}
}






