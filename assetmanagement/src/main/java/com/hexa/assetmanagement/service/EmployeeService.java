package com.hexa.assetmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.repository.EmployeeRepository;

@Service
public class EmployeeService {
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private UserService userService;

	public Employee addEmployee(Employee employee,
			int id) throws InvalidContactException, InvalidIdException {
		if(employee.getContact().length()!=10)
			throw new InvalidContactException("Invalid Contact number....");
		//get the user and add it in the employee
		User user=userService.getById(id);
		employee.setUser(user);
		return employeeRepository.save(employee);
	}
	public Employee getById(int id) throws InvalidIdException {
		Optional<Employee> op=employeeRepository.findById(id);
		if(op.isEmpty())
			throw new InvalidIdException("Employee Id is invalid....");
		return op.get();
	}

	public List<Employee> getAll(Pageable pageable) {
		return employeeRepository.findAll(pageable).getContent();
	}

}
