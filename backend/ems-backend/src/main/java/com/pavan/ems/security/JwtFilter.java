package com.pavan.ems.security;

import java.util.List;
import com.pavan.ems.util.JwtUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        String token = null;
        String username = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            username = jwtUtil.extractUsername(token);
        }

        if (request.getRequestURI().startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (token != null && jwtUtil.validateToken(token)) {

            UsernamePasswordAuthenticationToken auth =new UsernamePasswordAuthenticationToken(
    username,
    null,
    List.of(new SimpleGrantedAuthority("ROLE_" + jwtUtil.extractRole(token)))
);
                  

            SecurityContextHolder.getContext().setAuthentication(auth);

        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }
}