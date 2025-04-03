package com.hexa.assetmanagement.service;



import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Category;
import com.hexa.assetmanagement.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	public Category addCategory(Category category) {
		return categoryRepository.save(category);
	}
	public Category getById(int id) throws InvalidIdException {
		Optional<Category> op=categoryRepository.findById(id);
		if(op.isEmpty())
			throw new InvalidIdException("Category Id is invalid....");
		return op.get();
	}

}
