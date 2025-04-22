package com.hexa.assetmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.User;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	//declaring for finding the list of employee with his/her name.
	List<Employee> findByName(String name);

	//declaring for finding the list of employee with his/her department.
	List<Employee> findByDepartmentName(String department);
 
	//declaring for finding an user.
	Optional<Employee> findByUser(User user);
	
	//find the employee by the username
	Employee findByUserUsername(String username);

 

}
