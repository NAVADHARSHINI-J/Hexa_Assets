package com.hexa.assetmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.assetmanagement.exception.InvalidIdException;
import com.hexa.assetmanagement.model.Category;
import com.hexa.assetmanagement.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/add")
	public Category addCategory(@RequestBody Category category) {
		//call method to add category
		return categoryService.addCategory(category);
	}
	@GetMapping("/getbyid/{CategoryId}")
	public Category getById(@PathVariable int CategoryId) throws InvalidIdException {
		//call method to get by id
		return categoryService.getById(CategoryId);
	}
	
	@GetMapping("/getall")
	public List<Category> getAll() {
		return categoryService.getall();
	}
}
