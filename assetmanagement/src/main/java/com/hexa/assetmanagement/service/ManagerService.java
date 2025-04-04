package com.hexa.assetmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.model.Manager;
import com.hexa.assetmanagement.repository.ManagerRepository;

@Service
public class ManagerService {
	
	@Autowired
	private ManagerRepository managerRepository;

	public Manager add(Manager manager) {
			return managerRepository.save(manager);
		}
}

