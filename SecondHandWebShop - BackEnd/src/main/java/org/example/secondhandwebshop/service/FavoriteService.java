package org.example.secondhandwebshop.service;

import org.example.secondhandwebshop.model.Favorite;
import org.example.secondhandwebshop.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Favorite> getFavoriteByUser(Integer userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public void save(Favorite favorite) {
        favoriteRepository.save(favorite);
    }

    public void delete(Integer userId, Integer productId) {
        Favorite favorite = favoriteRepository.findByUserIdAndProductId(userId, productId);
        favoriteRepository.delete(favorite);
    }
}
