package com.hexa.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.assetmanagement.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

}
