package com.example.modulesbackend.service;

import com.example.modulesbackend.dto.ModuleDTO;
import com.example.modulesbackend.entity.ModelEntity;
import com.example.modulesbackend.exception.ResourceNotFoundException;
import com.example.modulesbackend.repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModuleService {private final ModuleRepository repository;

    public Page<ModuleDTO> getAllModules(String search, String category, String status, String collaborator, String tag, Pageable pageable) {
        String searchParam = (search == null) ? "" : search;
        String categoryParam = (category == null) ? "" : category;

        // Pass the string status value directly to the explicit filter query
        String statusParam = (status == null) ? "PENDING_REVIEW" : status;

        return repository.findByCustomFilters(searchParam, categoryParam, statusParam, pageable)
                .map(this::convertToDTO);
    }

    public ModuleDTO getModuleById(String id) {
        return repository.findById(id).map(this::convertToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with execution key: " + id));
    }

    public ModuleDTO createModule(ModuleDTO dto) {
        ModelEntity entity = convertToEntity(dto);
        return convertToDTO(repository.save(entity));
    }

    public ModuleDTO updateModule(String id, ModuleDTO dto) {
        ModelEntity entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Module update targets structural failure. ID: " + id));
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setTags(dto.getTags());
        entity.setCollaborators(dto.getCollaborators());
        entity.setStatus(dto.getStatus());
        return convertToDTO(repository.save(entity));
    }

    private ModuleDTO convertToDTO(ModelEntity entity) {
        ModuleDTO dto = new ModuleDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setCategory(entity.getCategory());
        dto.setTags(entity.getTags());
        dto.setCollaborators(entity.getCollaborators());
        dto.setStatus(entity.getStatus());
        dto.setCreatedOn(entity.getCreatedOn());
        dto.setUpdatedOn(entity.getUpdatedOn());
        return dto;
    }

    private ModelEntity convertToEntity(ModuleDTO dto) {
        ModelEntity entity = new ModelEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setTags(dto.getTags());
        entity.setCollaborators(dto.getCollaborators());
        entity.setStatus(dto.getStatus());
        return entity;
    }
}