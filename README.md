# 🚗 Used Car E-Commerce Application (SPA)

## 📌 Overview

This project is a **Full Stack Used Car E-Commerce SPA** built as part of a technical assignment.

 # Features 
 ## User (Buyer)
- Browse car listings
- Search by brand, model, location
- Filter (Base Price, fuel type, year, mileage, transmission)
- Sort (price, year, mileage)
- View car details

## Admin
- Add car
- Update car
- Delete car
- Manage price components
- Final price is dynamically calculated:
    
Final Price = Base Price 

&#x20;           + Additions (fixed / %)

&#x20;           - Deductions (fixed / %)

- Filter, search, and view car listings  
- Admin users to manage listings  

The system is designed with focus on:
- Security  
- Scalability  
- Clean architecture  
- Maintainability  

---

## 🛠 Tech Stack

### 🔹 Backend
- Java + Spring Boot  
- Spring Data JPA  
- MySQL  
- JWT Authentication (Role-based)

### 🔹 Frontend
- React  
- Tailwind CSS  
- Axios (API communication)

---

## 🚀 Run With Docker

```bash
docker-compose up --build
```

Frontend → http://localhost:5173  
Backend → http://localhost:8080  
MySQL → localhost:3306  

---

## Limitations / Future Improvements
- Image upload can be enhanced using cloud storage (AWS S3)
- Add refresh token mechanism
- Improve UI/UX animations
- Add unit + integration test coverage

# Author 
- Pradeep Pathak