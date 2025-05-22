# 🛡️ NestJS To-do App with JWT Authentication

A secure RESTful API built with **NestJS**, **MongoDB (Cloud Cluster)**, and **JWT** that supports **user registration**, **login**, **access/refresh token-based authentication**, and **session management**.

---

## 🚀 Features

- User registration with `name`, `email`, and `password`
- Login with email and password
- Secure password hashing with bcrypt
- JWT-based authentication (Access & Refresh tokens)
- Token refresh endpoint
- MongoDB Cloud integration with Mongoose
- RESTful API with DTO validation

---

## 📁 Technologies

- **NestJS**
- **Mongoose** (MongoDB ODM)
- **JWT** (`@nestjs/jwt`)
- **bcryptjs**
- **class-validator / class-transformer**

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/rafi-ruetcse17/backend.git


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Schema Design

![todoApps Schema](./assets/todoapps_schema.png)

---

## API Endpoints 

Base URL: http://localhost:4000

---

POST /auth/signup
------------------
Description: Register a new user.
```
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}

Success Response (201)
```
---

POST /auth/login
-----------------
Description: Login user and return tokens.
```
Request Body:
{
  "email": "john@example.com",
  "password": "yourpassword"
}

Success Response (200):
{
  "accessToken": "<JWT_ACCESS_TOKEN>",
  "refreshToken": "<JWT_REFRESH_TOKEN>"
}
```
---

POST /auth/refresh
-------------------
Description: Generate a new access token using a refresh token.
```
Request Body:
{
  "refreshToken": "<JWT_REFRESH_TOKEN>"
}

Success Response (200):
{
  "accessToken": "<NEW_JWT_ACCESS_TOKEN>"
}
```
---

POST /api/todo-apps/create
-------------------
Description: Creat a Todo App.

```
Request Body:
{
  "title": "First App",
  "owner": "682cba10b7b0df2f1f440b22"
}

Success Response (200):
{
  "title": "First App",
  "owner": "682cba10b7b0df2f1f440b22",
  "_id": "682ee77a705c56ffa8923ad3",
  "collaborators": [],
  "createdAt": "2025-05-22T08:59:38.539Z",
  "updatedAt": "2025-05-22T08:59:38.539Z",
  "__v": 0
}
```
---

POST /api/todo-apps/invite/:id
-------------------
Description: Invite and assign role.

```
Request Body:
{
  "owner": "682cba10b7b0df2f1f440b22",
  "userId": "682e2953382aa24ebcc6e0e3",
  "role": "editor"
}

Success Response (200):
{
  "_id": "682ee77a705c56ffa8923ad3",
  "title": "First App",
  "owner": "682cba10b7b0df2f1f440b22",
  "collaborators": [
   {
      "userId": "682e2953382aa24ebcc6e0e3",
        "role": "editor"
    }
  ],
  "createdAt": "2025-05-22T08:59:38.539Z",
  "updatedAt": "2025-05-22T12:20:35.291Z",
  "__v": 1
}
```
---


Token Notes:
-------------
- Access Token: Short-lived (e.g., 15 minutes)
- Refresh Token: Long-lived (e.g., 7 days)
- Use access token for all protected routes
- When access token expires, use refresh token to get a new one

---

Status Codes:
--------------
200 – Success  
400 – Bad Request  
401 – Unauthorized  
403 – Forbidden  
500 – Server Error