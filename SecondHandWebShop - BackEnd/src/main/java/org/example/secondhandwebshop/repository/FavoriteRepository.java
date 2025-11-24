package org.example.secondhandwebshop.repository;

import org.example.secondhandwebshop.model.Favorite;
import org.example.secondhandwebshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    List<Favorite> findByUserId(Integer userId);

    Favorite findByUserIdAndProductId(Integer userId, Integer productId);
}
