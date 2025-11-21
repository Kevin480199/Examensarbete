package org.example.secondhandwebshop.controller;

import jakarta.persistence.EntityNotFoundException;
import org.example.secondhandwebshop.dto.ProductRequest;
import org.example.secondhandwebshop.model.Product;
import org.example.secondhandwebshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@Validated
@CrossOrigin(origins = "http://localhost:1234")
public class ProductController {

    @Autowired
    private ProductService productService;
    /*
    @GetMapping
    public List<Product> getProducts(@RequestParam(required = false) String name) {
        if (name != null && !name.isEmpty()) {
            // Return a person by name
            return productService.findByName(name);

        }
        return productService.findAll();
    }
     */
    @GetMapping
    public Page<Product> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return productService.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public Optional<Product> getProduct(@PathVariable int id) {

        return productService.findById(id);
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest request) {
        try {
            Product product = productService.createProduct(request);
            return new ResponseEntity<>(product, HttpStatus.CREATED);

        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>("Error creating product", HttpStatus.BAD_REQUEST);
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

    @PutMapping("/{id}/sold")
    public ResponseEntity<?> markAsSold(@PathVariable Integer id) {
        productService.updateAvailable(id);
        return new ResponseEntity<>(HttpStatus.OK);
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
