# Employee Management System (EMS)

## Overview

Employee Management System (EMS) is a full-stack web application developed using React, Spring Boot, and MySQL. The application allows administrators to manage employee records and provides secure authentication and authorization using JWT and Spring Security.

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT-based Authentication
* BCrypt Password Encryption
* Role-Based Access Control (ADMIN / USER)
* Protected Routes
* Logout Functionality

### Employee Management

* Add Employee
* Update Employee
* Delete Employee
* View Employee List
* Role-Based UI Controls

### Frontend

* React
* React Router
* Axios
* Material UI Components

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* BCrypt Password Encoding

### Database

* MySQL

---

## Technology Stack

### Frontend

* React
* JavaScript
* Axios
* React Router

### Backend

* Java 17
* Spring Boot
* Spring Security
* Spring Data JPA
* Maven

### Database

* MySQL

---

## Project Structure

employee-management-system/

├── frontend/

│ ├── src/

│ ├── public/

│ └── package.json

│

├── backend/

│ └── ems-backend/

│ ├── src/

│ ├── pom.xml

│ └── mvnw

│

├── database/

├── docs/

└── docker/

---

## Getting Started

### Prerequisites

* Java 17
* Maven
* Node.js
* MySQL
* Git

---

### Backend Setup

Navigate to backend directory:

cd backend/ems-backend

Install dependencies and run:

mvn spring-boot:run

Backend runs on:

http://localhost:8080

---

### Frontend Setup

Navigate to frontend directory:

cd frontend

Install dependencies:

npm install

Start application:

npm run dev

Frontend runs on:

http://localhost:5173

---

## API Endpoints

### Authentication

POST /auth/register

POST /auth/login

### Employees

GET /api/employees

POST /api/employees

PUT /api/employees/{id}

DELETE /api/employees/{id}

---

## Roles

### ADMIN

* View Employees
* Add Employees
* Update Employees
* Delete Employees

### USER

* View Employees Only

---

## Security

* JWT Token Authentication
* Password Encryption using BCrypt
* Role-Based Authorization
* Protected React Routes

---

## Future Enhancements

* Docker Containerization
* AWS Deployment
* Pagination
* Search Employees
* Dashboard Analytics
* Swagger Documentation
* CI/CD Pipeline using GitHub Actions

---

## Author

Pavan Zade

Mechanical Engineering Graduate

Aspiring Java Full Stack Developer
