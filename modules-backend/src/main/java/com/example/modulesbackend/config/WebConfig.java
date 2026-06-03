package com.example.modulesbackend.config;

import com.example.modulesbackend.controller.HeaderAuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final HeaderAuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Enforce secure validation on all module interaction routes
        registry.addInterceptor(authInterceptor).addPathPatterns("/api/modules/**");
    }
}