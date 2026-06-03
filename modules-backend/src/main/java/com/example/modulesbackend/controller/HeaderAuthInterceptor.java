package com.example.modulesbackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import java.util.Map;

@Component
public class HeaderAuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Support open browser preflight cors queries
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) return true;

        String clientRole = request.getHeader("X-Authenticated-Role");
        if (clientRole == null || (!clientRole.equals("ADMIN") && !clientRole.equals("USER"))) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Unauthorized: Missing or corrupted profile access key context headers.\"}");
            return false;
        }
        return true;
    }
}