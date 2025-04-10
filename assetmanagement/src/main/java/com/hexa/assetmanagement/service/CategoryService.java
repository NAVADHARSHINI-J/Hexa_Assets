package com.hexa.assetmanagement.service;



import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Category;
import com.hexa.assetmanagement.repository.CategoryRepository;

@Service
public class CategoryService {
	Logger logger=LoggerFactory.getLogger("CategoryService");

	@Autowired
	private CategoryRepository categoryRepository;
	public Category addCategory(Category category) {
		logger.info("Category added with name "+category.getName());
		return categoryRepository.save(category);
	}
	public Category getById(int id) throws InvalidIdException {
		//check whether the category is present with id or not
		Optional<Category> op=categoryRepository.findById(id);
		if(op.isEmpty())
			throw new InvalidIdException("Category Id is invalid....");
		logger.info("Category found with name "+op.get().getName());
		return op.get();
	}
	public List<Category> getall() {
		logger.info("All Categories of asset was got from db");
		return categoryRepository.findAll();
	}

}




