🚗 Used Car E-Commerce Application (SPA)
📌 Overview

This project is a Full Stack Used Car E-Commerce SPA built as part of a technical assignment.

It allows users to:

Browse, search, and view car listings
Admin users to manage listings

The system is designed with focus on:

Security
Scalability
Clean architecture
Maintainability
🛠 Tech Stack
🔹 Backend
Java + Spring Boot
Spring Data JPA
MySQL
JWT Authentication (Role-based)
🔹 Frontend
React (Vite)
Tailwind CSS
Axios (API communication)
📁 Project Structure
used-car-app/
│
├── used_car_service/     # Backend (Spring Boot)
├── used_car_frontend/    # Frontend (React)
│
├── docker-compose.yml
├── README.md
└── .gitignore
🚀 Setup & Run Instructions
1️⃣ Clone Repository
git clone https://github.com/pradeepgitsource/used-car-app.git
cd used-car-app
🐳 2️⃣ Run With Docker (Recommended)
docker-compose up --build
Access:
Frontend → http://localhost:5173
Backend → http://localhost:8080
MySQL → localhost:3306
▶️ 3️⃣ Run Backend (Without Docker)
cd used_car_service
mvn clean install
mvn spring-boot:run

Backend runs on:

http://localhost:8080
▶️ 4️⃣ Run Frontend (Without Docker)
cd used_car_frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔐 Environment Variables

Create .env inside used_car_frontend:

VITE_API_URL=http://localhost:8080
✨ Features
👤 User (Buyer)
Browse car listings
Search by brand, model, location
Filter (price, fuel type, year, mileage, transmission)
Sort (price, year, mileage)
View car details
🛠 Admin
Add car
Update car
Delete car
Manage price components
💰 Price Calculation
Final Price = Base Price 
            + Additions (fixed / %)
            - Deductions (fixed / %)
⚙️ Assumptions
Users have ADMIN and BUYER roles
Authentication via JWT tokens
Images stored as URLs (not file storage)
Default status = AVAILABLE
Price components are optional
Validation handled at service layer
Pagination implemented
🧠 Design Decisions
🔹 Backend
Service Layer pattern for business logic separation
Specification pattern for dynamic filtering
DTO-based architecture (no entity exposure)
Centralized exception handling
JWT-based secure APIs
🔹 Frontend
Component-based architecture
Axios for API abstraction
Tailwind for responsive UI
State managed using React hooks
📈 Scalability Considerations
Pagination for large datasets
Dynamic filtering via JPA Specification
Stateless authentication (JWT)
Modular architecture
⚠️ Limitations / Future Improvements
Image upload via AWS S3
Refresh token implementation
Add caching (Redis)
Improve UI/UX animations
Add unit & integration testing
CI/CD pipeline
Production deployment
📸 Screenshots
Home Page Guest User
![Home Page](image.png)
![Details Page](image-1.png)
![Login Page](image-2.png)
![User/ Buyer Page](image-3.png)
![Admin Page](image-4.png)

📚 API Documentation

(Optional – Swagger / Postman collection can be added)

👨‍💻 Author

Pradeep Pathak