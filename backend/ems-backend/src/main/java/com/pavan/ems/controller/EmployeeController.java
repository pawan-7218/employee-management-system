package com.pavan.ems.controller;

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
    @PostMapping
public EmployeeDTO create(@Valid @RequestBody EmployeeDTO dto) {
    return service.saveEmployee(dto);
}

@PutMapping("/{id}")
public EmployeeDTO update(@PathVariable Long id, @Valid @RequestBody EmployeeDTO dto) {
    return service.updateEmployee(id, dto);
}

@GetMapping
public List<EmployeeDTO> getAll() {
    return service.getAllEmployees();
}

@GetMapping("/{id}")
public EmployeeDTO getById(@PathVariable Long id) {
    return service.getEmployeeById(id);
}



@DeleteMapping("/{id}")
public void delete(@PathVariable Long id) {
    service.deleteEmployee(id);

}
}
