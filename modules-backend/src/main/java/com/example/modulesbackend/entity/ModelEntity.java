package com.example.modulesbackend.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "modules")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelEntity {
    @Id
    private String id;
    private String name;
    private String description;
    private String category;
    private List<String> tags;
    private List<String> collaborators; // Used as Authors in this context
    private ModelStatus status;

    // New UX fields from design references
    private String serviceComponent; // e.g., "Workshop", "Counseling Session"
    private String programName;      // e.g., "Mind Matters Jr."
    private String targetGroup;      // e.g., "12th Grade", "College Freshmen"

    @CreatedDate
    private LocalDateTime createdOn;
    @LastModifiedDate
    private LocalDateTime updatedOn;
}