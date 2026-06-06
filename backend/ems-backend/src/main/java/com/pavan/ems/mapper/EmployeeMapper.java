package com.pavan.ems.mapper;

import com.pavan.ems.dto.EmployeeDTO;
import com.pavan.ems.entity.Employee;

public class EmployeeMapper {

    // DTO → Entity
    public static Employee mapToEntity(EmployeeDTO dto) {
        Employee emp = new Employee();
        emp.setFirstName(dto.getFirstName());
        emp.setLastName(dto.getLastName());
        emp.setEmail(dto.getEmail());
        emp.setDepartment(dto.getDepartment());
        emp.setDesignation(dto.getDesignation());
        emp.setSalary(dto.getSalary());
        emp.setJoiningDate(dto.getJoiningDate());
        return emp;
    }

    // Entity → DTO
    public static EmployeeDTO mapToDTO(Employee emp) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setFirstName(emp.getFirstName());
        dto.setLastName(emp.getLastName());
        dto.setEmail(emp.getEmail());
        dto.setDepartment(emp.getDepartment());
        dto.setDesignation(emp.getDesignation());
        dto.setSalary(emp.getSalary());
        dto.setJoiningDate(emp.getJoiningDate());
        return dto;
    }
}
