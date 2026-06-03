package com.example.modulesbackend.repository;

import com.example.modulesbackend.entity.ModelEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query; // CRITICAL: Ensure this exact import is present

public interface ModuleRepository extends MongoRepository<ModelEntity, String> {

    // Explicitly defines the JSON query pattern for MongoDB to bypass automatic name parsing
    @Query("{ '$and': [ " +
            "  { 'name': { '$regex': ?0, '$options': 'i' } }, " +
            "  { 'category': { '$regex': ?1, '$options': 'i' } }, " +
            "  { 'status': ?2 } " +
            "] }")
    Page<ModelEntity> findByCustomFilters(String name, String category, String status, Pageable pageable);
}