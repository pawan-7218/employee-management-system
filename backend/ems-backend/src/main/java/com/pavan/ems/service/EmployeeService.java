package com.pavan.ems.service;

import com.pavan.ems.dto.EmployeeDTO;
import com.pavan.ems.entity.Employee;
import java.util.List;

public interface EmployeeService {
EmployeeDTO saveEmployee(EmployeeDTO employeeDTO);

List<EmployeeDTO> getAllEmployees();

EmployeeDTO getEmployeeById(Long id);

EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);

void deleteEmployee(Long id);
   }