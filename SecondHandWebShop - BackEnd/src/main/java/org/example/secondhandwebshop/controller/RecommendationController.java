package org.example.secondhandwebshop.controller;

import org.example.secondhandwebshop.model.Product;
import org.example.secondhandwebshop.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;

@RestController
@RequestMapping("/api/recommendation")
@CrossOrigin(origins = "http://localhost:1234")
public class RecommendationController {

    @Autowired
    RecommendationService recommendationService;

    @GetMapping
    public HashSet<Product> getRecommendations(@RequestParam Integer userId) {
        return recommendationService.getRecommendation(userId);
    }
}
