package com.hexa.assetmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Manager;
import com.hexa.assetmanagement.service.ManagerService;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    
	@Autowired
	private ManagerService managerService;
	
	@PostMapping("/add/{id}")
	public Manager add(@RequestBody Manager manager,@PathVariable int id) throws InvalidIdException {
		return managerService.add(manager,id);
	}
}










