package com.hexa.assetmanagement.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.exception.UsernameInvalidException;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BCryptPasswordEncoder encoder;

	public User signup(User user) throws UsernameInvalidException {
		// check if user is present in the table or not
		User user1 = userRepository.findByUsername(user.getUsername());
		if (user1 != null) {
			throw new UsernameInvalidException("Username already exists...");
		}
		// check the role is given or not
		if (user.getRole() == null)
			user.setRole("EMPLOYEE");
		// encode the password
		String pass = encoder.encode(user.getPassword());
		// set the encoded password in user
		user.setPassword(pass);
		return userRepository.save(user);
	}

	public User getById(int id) throws InvalidIdException {
		// get the user from id
		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty())
			throw new InvalidIdException("the user id is invalid....");
		return user.get();
	}

}