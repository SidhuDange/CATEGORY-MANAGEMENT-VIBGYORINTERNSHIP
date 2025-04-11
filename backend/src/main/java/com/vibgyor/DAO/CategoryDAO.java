package com.vibgyor.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vibgyor.entities.Category;
import com.vibgyor.repoistory.CategoryRepository;
import com.vibgyor.services.CategoryService;

@Service
public class CategoryDAO implements CategoryService {

	@Autowired
	CategoryRepository repo;
	
	@Override
	public List<Category> getAllActiveCategories() {
		List<Category> li=repo.findAll();
		List<Category> activeCategory=li.stream().filter(cat->cat.getStatus()==true).toList();
		return activeCategory;
	}

	@Override
	public boolean createCategory(Category category) {
		Category cat=repo.findByCategoryName(category.getCategoryName());
		if(cat==null) {
			repo.save(category);
			return false;
		}
		return true;
	}

	@Override
	public boolean updateCategory(Integer id, Category category) {
		Category c=repo.findByCategoryName(category.getCategoryName());
		
		
		if(c==null) {
			Category cat=repo.findById(id).get();
			cat.setCategoryName(category.getCategoryName());
			cat.setDescription(category.getDescription());
			repo.save(cat);
			return true;
		}
		else if(c!=null && id==c.getCategoryId()) {
			Category cat=repo.findById(id).get();
			cat.setCategoryName(category.getCategoryName());
			cat.setDescription(category.getDescription());
			repo.save(cat);
			System.err.println("why");
			return true;
		}
		System.err.println("yoo");
		return false;
		
		
	}

	@Override
	public void deactivateCategory(Integer id) {
		Category category=repo.findById(id).get();
		category.setStatus(false);
		repo.save(category);
	}

	@Override
	public Category getCategoryById(int id) {
		Category category=repo.findById(id).get();
		return category;
	}

}
