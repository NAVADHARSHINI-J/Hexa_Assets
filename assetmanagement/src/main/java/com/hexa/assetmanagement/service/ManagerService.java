package com.hexa.assetmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Manager;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.repository.ManagerRepository;
import com.hexa.assetmanagement.repository.UserRepository;

@Service
public class ManagerService {
	@Autowired
	private ManagerRepository managerRepository;
	@Autowired
	private UserRepository userRepository;

	
	public Manager add(Manager manager, int id) throws InvalidIdException, InvalidContactException {
		//fetch user from id
		Optional<User> user=userRepository.findById(id);
		if(user.isEmpty())
			throw new InvalidIdException("the user id is invalid....");
		//check whether the contact number is correct are not
		if(manager.getContact().length() != 10)
			throw new InvalidContactException("Invalid contact number...");
		//set the user as manager
		manager.setUser(user.get());
		return managerRepository.save(manager);
	}

	public List<Manager> getAll() {
		//get all the manager from the database
		return managerRepository.findAll();
	}

	public Manager getById(int id) throws InvalidIdException {
		//check whether the manager is found in the given id
		Optional<Manager> op=managerRepository.findById(id);
		if(op.isEmpty())
			throw new InvalidIdException("Admin id is invalid.....");
		return op.get();
	}

	public Manager update(Manager manager, int id) 
			throws InvalidIdException, InvalidContactException {
		Manager man=getById(id);
		//check whether each value in manager is null or not 
       //if not null add that in the update existing manager
		if(man.getName() != null)
			man.setName(man.getName());
		if(man.getEmail() != null)
			man.setEmail(man.getEmail());
		// check whether the contact number is correct or else throw an exception
		if(man.getContact()!=null) {
		if(man.getContact().length() != 10)
			throw new InvalidContactException("Invalid contact number...");
		man.setContact(man.getContact());
		}
		if(man.getAddress() != null)
			man.setAddress(man.getAddress());
		return managerRepository.save(man);
	}
}

