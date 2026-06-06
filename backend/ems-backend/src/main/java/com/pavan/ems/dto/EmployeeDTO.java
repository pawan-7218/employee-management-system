package com.pavan.ems.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EmployeeDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private String designation;
    private Double salary;
    private LocalDate joiningDate;
}