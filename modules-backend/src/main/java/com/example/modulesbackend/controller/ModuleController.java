package com.example.modulesbackend.controller;

import com.example.modulesbackend.dto.ModuleDTO;
import com.example.modulesbackend.service.ModuleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ModuleController {
    private final ModuleService service;

    @GetMapping
    public ResponseEntity<Page<ModuleDTO>> getModules(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String collaborator,
            @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getAllModules(search, category, status, collaborator, tag, PageRequest.of(page, size, Sort.by("id").descending())));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModuleDTO> getModuleById(@PathVariable String id) {
        return ResponseEntity.ok(service.getModuleById(id));
    }

    @PostMapping
    public ResponseEntity<ModuleDTO> createModule(@Valid @RequestBody ModuleDTO dto) {
        return ResponseEntity.ok(service.createModule(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModuleDTO> updateModule(@PathVariable String id, @Valid @RequestBody ModuleDTO dto) {
        return ResponseEntity.ok(service.updateModule(id, dto));
    }
}