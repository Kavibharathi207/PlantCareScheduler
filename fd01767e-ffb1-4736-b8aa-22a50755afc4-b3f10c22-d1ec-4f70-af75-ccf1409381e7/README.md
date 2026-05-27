# 🌿 PlantCare

A full-stack plant care management application built with **React** (frontend) and **Spring Boot** (backend). Users can manage their personal plant collections, get smart care plan suggestions, and track watering, sunlight, and fertilizing schedules.

> 🎓 Academic Project — Developed in **August 2025**

---

## ✨ Features

- 🔐 Role-based authentication — Admin, User, Guest
- 🌱 Add, edit, delete plants in your personal collection
- 💡 Smart care plan suggestions with fuzzy search
- 💧 Track watering, sunlight, and fertilizing schedules
- 📊 Plant health analysis and statistics
- 👤 Admin dashboard — manage users and view stats
- 👁️ Guest access — browse care plans without registration
- 📖 Swagger UI for API documentation

---

## 🛠 Tech Stack

| Layer    | Technology                                |
|----------|-------------------------------------------|
| Frontend | React 18, React Router, Redux, Axios      |
| Backend  | Spring Boot 3.4, Spring Security, JPA     |
| Database | H2 (in-memory) / MySQL                    |
| Auth     | JWT (JJWT 0.11.5), BCrypt                 |
| API Docs | SpringDoc OpenAPI (Swagger UI)            |
| Build    | Maven 3.9, Node.js / npm                  |

---

## 📁 Project Structure

```
PlantCare/
├── reactapp/                        # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── LoginPage.jsx
│       │   ├── UserDashboard.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── GuestDashboard.jsx
│       │   ├── MyPlantsPage.jsx
│       │   ├── CarePlanPage.jsx
│       │   ├── AdminCarePlansPage.jsx
│       │   └── UserManagement.jsx
│       ├── services/api.js
│       └── context/PlantContext.js
│
└── springapp/                       # Spring Boot backend
    └── src/main/java/com/examly/springapp/
        ├── controller/
        ├── model/
        ├── service/
        ├── repository/
        └── config/
```

---

## ✅ Prerequisites

| Tool     | Version | Download |
|----------|---------|----------|
| Java JDK | 17+     | https://www.oracle.com/java/technologies/downloads/ |
| Maven    | 3.9+    | https://maven.apache.org/download.cgi |
| Node.js  | 16+     | https://nodejs.org/ |

---

## 🚀 Running the Application

### 1. Start the Backend

```bash
cd springapp
mvn spring-boot:run
```

> On Windows PowerShell, run this first if `mvn` is not recognized:
> ```
> $env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
> ```

- Backend runs at: **http://localhost:8080**
- Swagger UI: **http://localhost:8080/swagger-ui/index.html**

### 2. Start the Frontend

Open a **new** terminal:

```bash
cd reactapp
npm install
npm start
```

- Frontend runs at: **http://localhost:3000**

> ⚠️ Always start the backend **before** the frontend.

---

## 🗄 Database

The app uses **H2 in-memory database** by default — no installation needed.

`application.properties`:
```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:plantcare
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=create
```

To use **MySQL** instead, update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/plantcare?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

---

## 🔑 Default Credentials

| Role  | Username | Password      |
|-------|----------|---------------|
| Admin | `admin`  | `Admin@123`   |
| User  | `user`   | `user123`     |
| Guest | —        | Click "Continue as Guest" |

> New users can self-register from the login page by selecting the **User** role.

---

## 📡 API Endpoints

### Plants
| Method | Endpoint           | Description     |
|--------|--------------------|-----------------|
| GET    | `/api/plants`      | Get all plants  |
| POST   | `/api/plants`      | Add a plant     |
| PUT    | `/api/plants/{id}` | Update a plant  |
| DELETE | `/api/plants/{id}` | Delete a plant  |

### Care Plans
| Method | Endpoint                       | Description              |
|--------|--------------------------------|--------------------------|
| GET    | `/api/careplan/all`            | Get all care plans       |
| GET    | `/api/careplan/suggest/{name}` | Get care plan by name    |
| GET    | `/api/careplan/search/{name}`  | Fuzzy search care plans  |
| POST   | `/api/careplan`                | Create a care plan       |
| DELETE | `/api/careplan/{id}`           | Delete a care plan       |

### Users & Admin
| Method | Endpoint                           | Description           |
|--------|------------------------------------|-----------------------|
| POST   | `/api/users/register`              | Register a new user   |
| GET    | `/api/admin/users`                 | Get all users         |
| GET    | `/api/admin/stats`                 | Get app statistics    |
| PUT    | `/api/admin/users/{id}/deactivate` | Deactivate a user     |

---

## 👥 Roles & Permissions

| Feature                | Admin | User | Guest |
|------------------------|:-----:|:----:|:-----:|
| View care plans        | ✅    | ✅   | ✅    |
| Search care tips       | ✅    | ✅   | ✅    |
| Add/Edit/Delete plants | ✅    | ✅   | ❌    |
| View plant collection  | ✅    | ✅   | ❌    |
| Manage users           | ✅    | ❌   | ❌    |
| Add/Delete care plans  | ✅    | ❌   | ❌    |
| View admin dashboard   | ✅    | ❌   | ❌    |

---

## 🌱 Sample Care Plans

| Plant       | Water (days) | Sunlight (hrs) | Fertilize (days) |
|-------------|:------------:|:--------------:|:----------------:|
| Rose        | 2            | 6              | 14               |
| Aloe Vera   | 7            | 4              | 30               |
| Snake Plant | 14           | 2              | 60               |
| Marigold    | 1            | 8              | 7                |
| Tomato      | 2            | 8              | 7                |
| Cactus      | 14           | 6              | 60               |
| Basil       | 2            | 6              | 14               |
| Lotus       | 1            | 6              | 14               |

---

## 📄 License

This project was developed as an **academic project** in **August 2025** for educational purposes only. Not intended for commercial use.
