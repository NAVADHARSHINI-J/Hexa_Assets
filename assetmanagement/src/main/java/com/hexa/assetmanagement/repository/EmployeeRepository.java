package com.hexa.assetmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.Employee;
import com.hexa.assetmanagement.model.User;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	List<Employee> findByName(String name);

	List<Employee> findByDepartmentName(String department);

	Optional<Employee> findByUser(User user);

}
