package com.pavan.ems.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import com.pavan.ems.dto.EmployeeDTO;
import com.pavan.ems.entity.Employee;
import com.pavan.ems.service.EmployeeService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
public EmployeeDTO create(@Valid @RequestBody EmployeeDTO dto) {
    return service.saveEmployee(dto);
}
@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/{id}")
public EmployeeDTO update(@PathVariable Long id, @Valid @RequestBody EmployeeDTO dto) {
    return service.updateEmployee(id, dto);
}
@PreAuthorize("hasAnyRole('ADMIN','USER')")
@GetMapping
public List<EmployeeDTO> getAll() {
    return service.getAllEmployees();
}

@GetMapping("/{id}")
public EmployeeDTO getById(@PathVariable Long id) {
    return service.getEmployeeById(id);
}



@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/{id}")
public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
    service.deleteEmployee(id);
    return ResponseEntity.ok("Deleted");
}
}
