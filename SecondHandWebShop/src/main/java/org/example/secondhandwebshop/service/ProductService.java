package org.example.secondhandwebshop.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.secondhandwebshop.dto.ProductRequest;
import org.example.secondhandwebshop.model.Product;
import org.example.secondhandwebshop.model.User;
import org.example.secondhandwebshop.repository.ProductRepository;
import org.example.secondhandwebshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

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

    public Product createProduct(ProductRequest request) {
        User seller = userService.findById(request.getUserId());
        if (seller == null) {
            throw new NoSuchElementException("Seller not found");
        }

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setSeller(seller);

        return productRepository.save(product);
    }
}
