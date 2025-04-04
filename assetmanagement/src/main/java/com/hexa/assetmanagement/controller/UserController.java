package com.hexa.assetmanagement.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.exception.UsernameInvalidException;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.service.MyService;
import com.hexa.assetmanagement.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
    private UserService userService;
	@Autowired
	private MyService myService;
	
	@PostMapping("/signup")
	public User signup(@RequestBody User user) throws UsernameInvalidException {
		return userService.signup(user);
	}
	
	@PostMapping("/login")
 	public UserDetails login(Principal principal) {
 		/* Make this login as Authenticated API 
 		 * If this method is called, it means that Spring Filter alreeady
 		 * has correct username/password
 		 * 
 		 * Can i ask spring filter to share these username and password  with me?
 		 * -- yes but only username, spring filter never ever shares user password 
 		 * */
 		String username = principal.getName();
 		return myService.loadUserByUsername(username);
 	}
	@GetMapping("/getbyid/{id}")
	public User getById(@PathVariable int id) throws InvalidIdException {
		return userService.getById(id);
	}
}






