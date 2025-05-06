package com.hexa.assetmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Department;
import com.hexa.assetmanagement.repository.DepartmentRepository;

@Service
public class DepartmentService {

	@Autowired
	private DepartmentRepository departmentRepository;

	/*
	 * saving the department information in department repo
	 */
	public Department addDepartment(Department department) {
		return departmentRepository.save(department);
	}

	/*
	 * getting a deaprtment by its id.
	 * check if the id is valid or not
	 * then proceed. 
	 */
	public Department getById(int departmentId) throws InvalidIdException {
		//check if the department id exists or not.
		Optional<Department> op = departmentRepository.findById(departmentId);
		//if not throw an exception.
		if (op.isEmpty())
			throw new InvalidIdException("Department Id is invalid....");
		return op.get();
	}

	/*
	 * returning the list of departments. 
	 */
	public List<Department> getAll() {
		return departmentRepository.findAll();
	}

}
