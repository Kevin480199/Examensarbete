package org.example.secondhandwebshop.controller;

import org.example.secondhandwebshop.model.Favorite;
import org.example.secondhandwebshop.model.User;
import org.example.secondhandwebshop.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:1234")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @GetMapping
    public List<Favorite> getFavorites(@RequestParam Integer userId) {
        return favoriteService.getFavoriteByUser(userId);
    }

    @PostMapping
    public ResponseEntity<?> createFavorite(@RequestBody Favorite favorite) {
        try{
            favoriteService.save(favorite);
            return new ResponseEntity<>(HttpStatus.CREATED);

        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteFavorite(@RequestParam Integer userId, @RequestParam Integer productId) {
        try{
            favoriteService.delete(userId, productId);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
