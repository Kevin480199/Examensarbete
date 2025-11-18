package org.example.secondhandwebshop.controller;

import jakarta.persistence.EntityNotFoundException;
import org.example.secondhandwebshop.model.Product;
import org.example.secondhandwebshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/products")
@Validated
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getProducts(@RequestParam(required = false) String name) {
        if (name != null && !name.isEmpty()) {
            // Return a person by name
            return productService.findByName(name);

        }
        return productService.findAll();
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@Validated @RequestBody Product product) {
        try{
            productService.save(product);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@Validated @RequestBody Product product, @PathVariable Integer id) {
        try{
            // Update person by ID
            productService.update(id, product);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
        try{
            // Delete a person by ID
            productService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
