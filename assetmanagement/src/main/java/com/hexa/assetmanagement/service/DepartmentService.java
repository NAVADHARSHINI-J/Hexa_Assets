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

	public Department addDepartment(Department department) {
		return departmentRepository.save(department);
	}

	public Department getById(int id) throws InvalidIdException {
		Optional<Department> op = departmentRepository.findById(id);
		if (op.isEmpty())
			throw new InvalidIdException("Department Id is invalid....");
		return op.get();
	}

	public List<Department> getAll() {
		return departmentRepository.findAll();
	}

}
