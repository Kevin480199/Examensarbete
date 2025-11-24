package org.example.secondhandwebshop.service;

import org.example.secondhandwebshop.model.Favorite;
import org.example.secondhandwebshop.model.Product;
import org.example.secondhandwebshop.repository.FavoriteRepository;
import org.example.secondhandwebshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class RecommendationService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    FavoriteRepository favoriteRepository;

    public HashSet<Product> getRecommendation(Integer userId) {
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        HashSet<Product> recommendations = new HashSet<>();
        for (Favorite favorite : favorites) {
            List<Product> listOfSameCategory = productRepository.findByCategory(favorite.getProduct().getCategory());
            listOfSameCategory.remove(favorite.getProduct());
            recommendations.addAll(listOfSameCategory);
        }
        return recommendations;
    }
}
