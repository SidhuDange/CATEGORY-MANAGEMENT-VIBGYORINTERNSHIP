package com.vibgyor.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vibgyor.entities.Category;
import com.vibgyor.services.CategoryService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {"http://localhost:3000"})
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> li= categoryService.getAllActiveCategories();
        return new ResponseEntity<List<Category>>(li,HttpStatus.OK); 
    }

    @PostMapping
    public ResponseEntity<String> createCategory(@RequestBody Category category) {
        boolean present= categoryService.createCategory(category);
        if(present) {
        	return new ResponseEntity<String>("Category Already exist",HttpStatus.ALREADY_REPORTED);
        }
        return new ResponseEntity<String>("Created",HttpStatus.CREATED);
    }
    
    @GetMapping("/categoryById/{id}")
    public Category getCategoryById(@PathVariable int id) {
    	return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Integer id, @RequestBody Category category) {
        boolean categoryPresentCheck= categoryService.updateCategory(id, category);
        if(categoryPresentCheck) {
        	return new ResponseEntity<String>("Updated",HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<String>("Category already exist",HttpStatus.ALREADY_REPORTED);
    }

    @PutMapping("/deactivate/{id}")
    public ResponseEntity<String> deactivateCategory(@PathVariable Integer id) {
        categoryService.deactivateCategory(id);
        return new ResponseEntity<String>("deactivated",HttpStatus.OK);
    }
}
