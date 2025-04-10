package com.hexa.assetmanagement.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Admin;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.repository.AdminRepository;
import com.hexa.assetmanagement.repository.UserRepository;

@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private UserRepository userRepository;

	Logger logger=LoggerFactory.getLogger("AdminService");
	public Admin add(Admin admin, int id) throws InvalidIdException, InvalidContactException {
		//get the user from id
		Optional<User> user=userRepository.findById(id);
		if(user.isEmpty())
			throw new InvalidIdException("the user id is invalid....");
		//check whether the contact number is correct are not
		if(admin.getContact().length() != 10)
			throw new InvalidContactException("Invalid contact number...");
		//set the user in the admin
		admin.setUser(user.get());
		return adminRepository.save(admin);
	}

	public List<Admin> getAll() {
		//get all the admin in the db
		return adminRepository.findAll();
	}

	public Admin getById(int id) throws InvalidIdException {
		//check whether the admin found with the given id
		Optional<Admin> op=adminRepository.findById(id);
		if(op.isEmpty())
			throw new InvalidIdException("Admin id is invalid.....");
		return op.get();
	}

	public Admin update(Admin admin, int id) 
			throws InvalidIdException, InvalidContactException {
		Admin admin1=getById(id);
		//check whether each value in admin is mull or not 
       //if not null add that in the existing admin
		if(admin.getName() != null)
			admin1.setName(admin.getName());
		if(admin.getEmail() != null)
			admin1.setEmail(admin.getEmail());
		// check whether the contact number length is 10 else throw an exception
		if(admin.getContact()!=null) {
		if(admin.getContact().length() != 10)
			throw new InvalidContactException("Invalid contact number...");
		admin1.setContact(admin.getContact());
		}
		if(admin.getAddress() != null)
			admin1.setAddress(admin.getAddress());
		
		return adminRepository.save(admin1);
	}
}









