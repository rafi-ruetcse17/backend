# 🛡️ NestJS Collaborative ToDo App

A secure, efficient, and collaborative ToDo app backend built with **NestJS**, **MongoDB (Mongoose)**, and **JWT Auth**.

This backend powers a collaborative ToDo platform where:

- Users can **register/login** securely with hashed passwords.
- Create multiple **ToDo apps**, each maintaining a separate task list.
- **Invite collaborators** to apps with roles: `editor`, or `viewer`.
- Perform **task CRUD operations** (create, update, delete, change status) with role-based access control.
- **Paginated & sorted** task retrieval for enhanced performance.
- Protected routes and service-level guards for maximum security.

---

## 🚀 Features

### 🔐 Authentication
- Signup & Login with JWT (Access + Refresh Tokens)
- Passwords hashed using `bcryptjs`

### 🗂️ ToDo App
- Create personal ToDo apps
- Invite collaborators with role: `viewer` or `editor`
- Only **owner** or **editors** can modify tasks
- Roles are maintained through seperate enum files.

### ✅ Tasks (Embedded in ToDo App)
- Add, update, delete tasks (embedded subdocuments)
- **Paginated** task fetch via query params: `pageNumber`, `pageSize`
- Query optimizations:
  - Only neccessary payloads are sent to response to speed up queries.
  - Tasks are stored as inner schema of todo apps so that get queries work fast instead of looking up on the all tasks of all apps.

### 🛡️ AuthGuard
- All ToDo and Task routes are protected with `@UseGuards(AuthGuard)`
- Access control enforced on service level with helper `canEdit()`

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/rafi-ruetcse17/backend.git

## Open terminal (i.e. VS Code) and install dependencies
$ cd backend
$ npm install

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

![todoApps Schema](./assets/todoapps_schema_v2.png)

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

POST /api/todo-apps/create
-------------------
Description: Creat a Todo App.

```
Request Body:
{
  "title": "First App",
}

Success Response (200):
{
  "title": "First App",
  "owner": "682cba10b7b0df2f1f440b22",
  "_id": "682ee77a705c56ffa8923ad3",
  "collaborators": [],
  "tasks": [],
  "createdAt": "2025-05-22T08:59:38.539Z",
  "updatedAt": "2025-05-22T08:59:38.539Z",
  "__v": 0
}
```
---

GET /api/todo-apps/my-apps
-------------------
Description: Get all apps that current user has access to.

```
Request:

Success Response (200):
[
  {
    "_id": "68315af61f6f2355e23da6c5",
    "title": "new app 100",
    "owner": "682cba10b7b0df2f1f440b22",
    "createdAt": "2025-05-24T05:36:54.874Z",
    "updatedAt": "2025-05-24T09:06:03.678Z",
    "__v": 1,
    "role": "owner"
  },
  {
    "_id": "6830d64f99752c8761256f1c",
    "title": "new app",
    "owner": "682e2953382aa24ebcc6e0e3",
    "createdAt": "2025-05-23T20:10:55.425Z",
    "updatedAt": "2025-05-23T20:22:30.582Z",
    "__v": 1,
    "role": "viewer"
  }
]
```
---

POST /api/todo-apps/invite/:appId
-------------------
Description: Invite and assign role.

```
Request Body:
{
  "userId": "682e2953382aa24ebcc6e0e3",
  "role": "editor"
}

Success Response (201):
{
  "message":"Collaborator invited successfully"
}
```
---

DELETE /api/todo-apps/:appId
-------------------
Description: Delete an existing app.

```
Request:

Success Response (200):
{
  "acknowledged": true,
  "deletedCount": 1
}
```
---

POST /api/todo-apps/:appId/tasks
-------------------
Description: Create a task under an app.

```
Request Body:
{
  "title": "Task title",
  "description": "Task Description"
}

Success Response (201):
{
  "title": "Task title",
  "description": "Task Description",
  "status": "in-progress",
  "createdBy": "682cba10b7b0df2f1f440b22",
  "_id": "683185d03e41321727598730",
  "createdAt": "2025-05-24T08:39:44.205Z",
  "updatedAt": "2025-05-24T08:39:44.205Z"
}
```
---

GET /api/todo-apps/:appId/tasks
-------------------
Description: Get paginated task list.

```
Request Params:
{
  "pageNumber": "1",
  "pageSize": "6"
}

Success Response (200):
{
  "totalCount": 2,
  "tasks": [
    {
      "title": "Task 2 title",
      "description": "Task 2 description",
      "status": "in-progress",
      "createdBy": "682cba10b7b0df2f1f440b22",
      "_id": "683189b13e4132172759873a",
      "createdAt": "2025-05-24T08:56:17.696Z",
      "updatedAt": "2025-05-24T08:56:17.696Z"
    },
    {
      "title": "Task title",
      "description": "Task Description",
      "status": "in-progress",
      "createdBy": "682cba10b7b0df2f1f440b22",
      "_id": "683185d03e41321727598730",
      "createdAt": "2025-05-24T08:39:44.205Z",
      "updatedAt": "2025-05-24T08:39:44.205Z"
    }
  ],
  "role": "owner",
  "page": 1,
  "pageSize": 6
}
```
---

PATCH /api/todo-apps/:appId/tasks/:taskId
-------------------
Description: Update an existing task.

```
Request Body:
{
  "title": "Task 2 title edit",
  "description": "Task 2 description edit"
}

Success Response (200):
{
  "title": "Task 2 title edit",
  "description": "Task 2 description edit",
  "status": "in-progress",
  "createdBy": "682cba10b7b0df2f1f440b22",
  "_id": "683189b13e4132172759873a",
  "createdAt": "2025-05-24T08:56:17.696Z",
  "updatedAt": "2025-05-24T09:06:03.678Z"
}
```
---

DELETE /api/todo-apps/:appId/tasks/:taskId
-------------------
Description: Update an existing task.

```
Request:

Success Response (200):
{
  "acknowledged": true,
  "deletedCount": 1
}
```
---

Token Notes:
-------------
- Access Token Expires In: 7days
- Use access token for all protected routes

---

Status Codes:
--------------
200 – Success  
400 – Bad Request  
401 – Unauthorized  
403 – Forbidden  
500 – Server Error