package org.example.secondhandwebshop.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.secondhandwebshop.model.Product;
import org.example.secondhandwebshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public List<Product> findByName(String name) {
        return productRepository.findByName(name);
    }

    public void save(Product product) {
        productRepository.save(product);
    }

    public void update(Integer id, Product product) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (!product.getId().equals(id)) {
            throw new EntityNotFoundException("Product with id " + id + " not found");
        }
        save(product);
    }

    public void delete(Integer id) {
        Optional<Product> existingProduct = productRepository.findById(id);
        productRepository.deleteById(id);
    }
}
