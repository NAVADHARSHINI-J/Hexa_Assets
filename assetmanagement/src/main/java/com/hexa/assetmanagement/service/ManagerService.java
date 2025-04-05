package com.hexa.assetmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Manager;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.repository.ManagerRepository;

@Service
public class ManagerService {
	
	@Autowired
	private ManagerRepository managerRepository;
	private UserService userService;

	public Manager add(Manager manager, int id) throws InvalidIdException {
		    // get the user by the id and add it in manager
			User user=userService.getById(id);
			manager.setUser(user);
			return managerRepository.save(manager);
		}
}

