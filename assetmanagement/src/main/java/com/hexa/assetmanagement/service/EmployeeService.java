package com.hexa.assetmanagement.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable; 
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.repository.EmployeeRepository;
import com.hexa.assetmanagement.repository.UserRepository;

@Service
public class EmployeeService {
	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private UserRepository userRepository;
 

	Logger logger = LoggerFactory.getLogger("EmployeeService");

	public Employee addEmployee(Employee employee, String username) throws InvalidContactException, InvalidIdException {
		// check if the contact is valid or throw an exception.
		if (employee.getContact().length() != 10)
			throw new InvalidContactException("Invalid Contact number....");
		// get the user by username and add it in the employee model
		User user = userRepository.findByUsername(username);
		employee.setUser(user);
		logger.info("Employee added successfully ");
		return employeeRepository.save(employee);
	}

	public Employee getById(int empId) throws InvalidIdException {
		//check if the employee exists or not through his/her id.
		Optional<Employee> op = employeeRepository.findById(empId);
		//if not throw an exception.
		if (op.isEmpty())
			throw new InvalidIdException("Employee Id is invalid....");
		return op.get();
	}

	public List<Employee> getAll(Pageable pageable) {
		//returning the list of employee.
		return employeeRepository.findAll(pageable).getContent();
	}

	public List<Employee> filterByName(String name) {
		//returning the list of employee with his/her name.
		return employeeRepository.findByName(name);
	}

	public List<Employee> filterByDepartment(String department) {
		//returning the list of employee with his/her name.
		return employeeRepository.findByDepartmentName(department);
	}

	public Employee updateEmployee(Employee oldEmployee, Employee newEmployee) throws InvalidContactException {

		// check whether the name is not null and update
		if (newEmployee.getName() != null)
			oldEmployee.setName(newEmployee.getName());

		// check whether the email is not null and update
		if (newEmployee.getEmail() != null)
			oldEmployee.setEmail(newEmployee.getEmail());

		// check whether the contact is not null and update
		if (newEmployee.getContact() != null) {
			// check if the contact is valid or threw an exception.
			if (newEmployee.getContact().length() != 10)
				throw new InvalidContactException("Invalid Contact number....");

			oldEmployee.setContact(newEmployee.getContact());
		}

		// check whether the address is not null and update
		if (newEmployee.getAddress() != null)
			oldEmployee.setAddress(newEmployee.getAddress());

		logger.info("Employee " + oldEmployee.getName() + " updated successfully ");
		//saving the changes made.
		return employeeRepository.save(oldEmployee);

	}

	public String deleteByEmployee(Employee employee) {

		logger.info("Employee {} deleted successfully!", employee.getName());
		//deleting an employee.
		employeeRepository.delete(employee);
		
		return "Employee deleted successfully";

	}
	
	public Employee findByUsername(String username) {
		return employeeRepository.findByUserUsername(username);
	}

}
