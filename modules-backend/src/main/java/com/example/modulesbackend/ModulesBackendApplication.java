package com.example.modulesbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing // Required for automatic createdOn/updatedOn fields
public class ModulesBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(ModulesBackendApplication.class, args);
    }
}