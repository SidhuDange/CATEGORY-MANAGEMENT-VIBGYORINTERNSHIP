package com.vibgyor.services;

import java.util.List;

import com.vibgyor.entities.Category;

public interface CategoryService {

	List<Category> getAllActiveCategories();

	boolean createCategory(Category category);

	boolean updateCategory(Integer id, Category category);

	void deactivateCategory(Integer id);

	Category getCategoryById(int id);

}
