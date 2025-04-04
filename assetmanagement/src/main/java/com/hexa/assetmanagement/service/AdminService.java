package com.hexa.assetmanagement.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

	public Admin add(Admin admin, int id) throws InvalidIdException {
		//get the user from id
		Optional<User> user=userRepository.findById(id);
		if(user.isEmpty())
			throw new InvalidIdException("the user id is invalid....");
		//set the user in the admin
		admin.setUser(user.get());
		return adminRepository.save(admin);
	}
}









