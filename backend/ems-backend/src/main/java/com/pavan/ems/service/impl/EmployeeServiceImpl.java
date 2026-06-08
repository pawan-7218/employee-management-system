package com.pavan.ems.service.impl;

import com.pavan.ems.dto.EmployeeDTO;
import com.pavan.ems.entity.Employee;
import com.pavan.ems.mapper.EmployeeMapper;
import com.pavan.ems.repository.EmployeeRepository;
import com.pavan.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeServiceImpl(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
public EmployeeDTO saveEmployee(EmployeeDTO dto) {
    Employee emp = EmployeeMapper.mapToEntity(dto);
    Employee saved = repository.save(emp);
    return EmployeeMapper.mapToDTO(saved);
}

    @Override
public List<EmployeeDTO> getAllEmployees() {
    return repository.findAll()
            .stream()
            .map(EmployeeMapper::mapToDTO)
            .toList();
}

    @Override
public EmployeeDTO getEmployeeById(Long id) {
    Employee emp = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

    return EmployeeMapper.mapToDTO(emp);
}
@Override
public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
    Employee emp = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

    emp.setFirstName(dto.getFirstName());
    emp.setLastName(dto.getLastName());
    emp.setEmail(dto.getEmail());
    emp.setDepartment(dto.getDepartment());
    emp.setDesignation(dto.getDesignation());
    emp.setSalary(dto.getSalary());
    emp.setJoiningDate(dto.getJoiningDate());

    Employee updated = repository.save(emp);
    return EmployeeMapper.mapToDTO(updated);
}

    @Override
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
  }