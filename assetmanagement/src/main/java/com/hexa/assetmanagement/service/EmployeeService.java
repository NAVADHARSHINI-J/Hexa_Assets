package com.hexa.assetmanagement.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidContactException;
import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.exception.UsernameInvalidException;
import com.hexa.assetmanagement.model.Department;
import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.User;
import com.hexa.assetmanagement.repository.EmployeeRepository; 

@Service
public class EmployeeService {
	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private DepartmentService departmentService;

	Logger logger = LoggerFactory.getLogger("EmployeeService");

	/*here getting the department from department id and set in employee
	 *getting the user information passed with the employee object and saving it in user repo
	 *getting the updated user and set in employee
	 *save the employee in employee repo. 
	 */
	public Employee addEmployee(Employee employee,int departId) throws InvalidContactException, InvalidIdException, UsernameInvalidException {
		//get the department by id
		Department department=departmentService.getById(departId);
		//add the department
		employee.setDepartment(department);
		// check if the contact is valid or throw an exception.
		if (employee.getContact().length() != 10)
			throw new InvalidContactException("Invalid Contact number....");
		// get the user from employee
		User user = employee.getUser(); 
		user.setRole("EMPLOYEE");	
		//save the user in user repository to save the user for generating id of the user.
		user.setRole("EMPLOYEE");
		user= userService.signup(user);
		//setting the user with user-id in employee.
		employee.setUser(user);
		logger.info("Employee added successfully ");
		return employeeRepository.save(employee);
	}

	/*
	 * find the employee by his/her id - using optional.
	 */
	public Employee getById(int empId) throws InvalidIdException {
		//check if the employee exists or not through his/her id.
		Optional<Employee> op = employeeRepository.findById(empId);
		//if not throw an exception.
		if (op.isEmpty())
			throw new InvalidIdException("Employee Id is invalid....");
		return op.get();
	}

	/*
	 *getting all the employee from repo 
	 */
	public Page<Employee> getAll(Pageable pageable) {
		//returning the list of employee.
		return employeeRepository.findAll(pageable);
	}

	/*
	 * returning the list of employee with his/her name. 
	 */
	public List<Employee> filterByName(String name) {
		return employeeRepository.findByName(name);
	}

	/*
	 * returning the list of employee with his/her department name. 
	 */
	public Page<Employee> filterByDepartment(String department,Pageable pageable) {
		return employeeRepository.findByDepartmentName(department, pageable);
	}

	/*
	 *  checking the each constraint of the new employee reference either null or not,
	 *  if not null then update it, including department
	 *  then save the updated old reference of employee.
	 */
	public Employee updateEmployee(Employee oldEmployee, Employee newEmployee) throws InvalidContactException, InvalidIdException {

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
		//check the department
		if(newEmployee.getDepartment() != null) {
			//get the department by id
			Department department=departmentService.getById(newEmployee.getDepartment().getId());
			//set the department
			oldEmployee.setDepartment(department);
		}

		logger.info("Employee " + oldEmployee.getName() + " updated successfully ");
		//saving the changes made.
		return employeeRepository.save(oldEmployee);

	}

	/*
	 deleting the employee before that delete user details as well as the employee.
	 */
	public String deleteByEmployee(Employee employee) throws InvalidIdException {
		//delete the username
		User user=employee.getUser();
		logger.info("Employee {} deleted successfully!", employee.getName());
		//deleting an employee.
		employeeRepository.delete(employee);
		userService.deleteUser(user);
		
		return "Employee deleted successfully";

	}
	
	/*
	 * finding an employee by his/her username. 
	 */
	public Employee findByUsername(String username) {
		return employeeRepository.findByUserUsername(username);
	}
 
	/*
	 * filtering an employee by their user id  
	 */
	public Employee filterByUser(int userId) throws InvalidIdException {  
		Optional<Employee> optional = employeeRepository.findByUser_Id(userId); 

		if(optional.isEmpty()) {
			throw new InvalidIdException("Invalid user id");
		}
		return optional.get();
}
	public int getEmployeeSize() {
		return employeeRepository.findAll().size();
 
	}

}
