package org.example.secondhandwebshop.repository;

import org.example.secondhandwebshop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    List<Product> findByCategory(String category);
    List<Product> findByName(String name);
}
