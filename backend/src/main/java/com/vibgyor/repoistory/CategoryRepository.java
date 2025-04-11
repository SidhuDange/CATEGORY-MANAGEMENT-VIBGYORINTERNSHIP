package com.vibgyor.repoistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vibgyor.entities.Category;

@ResponseBody
public interface CategoryRepository extends JpaRepository<Category, Integer>{

	Category findByCategoryName(String string);

}
