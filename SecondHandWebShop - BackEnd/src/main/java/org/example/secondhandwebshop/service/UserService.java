package org.example.secondhandwebshop.service;

import org.example.secondhandwebshop.model.User;
import org.example.secondhandwebshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findById(Integer id) {
        return userRepository.findById(id)
                .orElse(null); // or throw exception if you prefer
    }
}

