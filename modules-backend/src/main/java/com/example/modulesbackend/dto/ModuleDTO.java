package com.example.modulesbackend.dto;

import com.example.modulesbackend.entity.ModelStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ModuleDTO {
    private String id;

    @NotBlank(message = "Module name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    private List<String> tags;
    private List<String> collaborators;

    @NotNull(message = "Status is required")
    private ModelStatus status;

    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
}